"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.email("Email inválido"),
  phone: z.string().min(1, { message: "Telefone é obrigatório" }),
  date: z.coerce.date(),
  serviceId: z.string().min(1, { message: "Serviço é obrigatório" }),
  time: z.string().min(1, { message: "Horário é obrigatório" }),
  clinicId: z.string().min(1, { message: "Clínica é obrigatória" }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    console.warn(
      "createNewAppointment validation failed:",
      schema.error.issues,
    );
    return {
      error: schema.error.issues[0].message,
    };
  }

  // Log incoming payload for debugging (avoid logging sensitive data in production)
  console.log("createNewAppointment called with:", {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    time: formData.time,
    date: formData.date,
    serviceId: formData.serviceId,
    clinicId: formData.clinicId,
  });

  try {
    // Verify clinic exists
    const clinic = await prisma.user.findUnique({
      where: { id: formData.clinicId },
      select: { id: true, name: true },
    });

    if (!clinic) {
      console.warn("createNewAppointment: clinic not found", formData.clinicId);
      return { error: "Clínica não encontrada" };
    }

    // Verify service exists and belongs to clinic
    const service = await prisma.service.findUnique({
      where: { id: formData.serviceId },
      select: { id: true, userId: true, duration: true },
    });

    if (!service || service.userId !== formData.clinicId) {
      console.warn("createNewAppointment: service not found or mismatched", {
        serviceId: formData.serviceId,
        clinicId: formData.clinicId,
      });
      return { error: "Serviço não encontrado para essa clínica" };
    }

    const selectedDate = new Date(formData.date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    // Use UTC to match how appointments are queried in /api/clinic/appointments
    const appointmentDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    console.log("createNewAppointment computed date:", {
      selectedDate: selectedDate.toISOString(),
      appointmentDate: appointmentDate.toISOString(),
    });

    // Basic conflict check: same clinic, same date and same start time
    const existing = await prisma.appointment.findFirst({
      where: {
        userId: formData.clinicId,
        appointmentDate: appointmentDate,
        time: formData.time,
      },
    });

    if (existing) {
      console.warn("createNewAppointment: time conflict", {
        clinicId: formData.clinicId,
        appointmentDate,
        time: formData.time,
      });
      return {
        error: "Horário já reservado. Por favor, escolha outro horário.",
      };
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });

    console.log("createNewAppointment: created appointment", {
      id: newAppointment.id,
      userId: newAppointment.userId,
      appointmentDate: newAppointment.appointmentDate,
      time: newAppointment.time,
    });

    return {
      data: newAppointment,
    };
  } catch (err) {
    // Provide more helpful server-side logging and a user-friendly message
    console.error("createNewAppointment unexpected error:", err);
    return {
      error: "Erro ao criar agendamento. Tente novamente mais tarde.",
    };
  }
}
