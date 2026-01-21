'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.email('Email inválido'),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  date: z.coerce.date(),
  serviceId: z.string().min(1, { message: 'Serviço é obrigatório' }),
  time: z.string().min(1, { message: 'Horário é obrigatório' }),
  clinicId: z.string().min(1, { message: 'Clínica é obrigatória' }),
});

type FormSchema = z.infer<typeof formSchema>;

export async function createNewAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(formData.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0);

    const newAppointment = await prisma.appointment.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.email,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId,
      },
    });
    return {
      data: newAppointment,
    };
  } catch (err) {
    console.log(err);
    return {
      error: 'Erro ao criar agendamento',
    };
  }
}
