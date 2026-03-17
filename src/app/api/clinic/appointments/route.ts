import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(request) {
  if (!request.auth?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const dateString = request.nextUrl.searchParams.get("date");
  if (!dateString) {
    return NextResponse.json({ error: "data não informada" }, { status: 400 });
  }

  const clinicId = request.auth.user.id;

  try {
    const [year, month, day] = dateString.split("-").map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return NextResponse.json({ error: "data inválida" }, { status: 400 });
    }

    // Create date range in UTC to match how appointments are stored
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    console.log("GET /api/clinic/appointments", {
      clinicId,
      dateString,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        time: "asc",
      },
    });

    console.log("Found appointments:", appointments.length);

    return NextResponse.json(appointments);
  } catch (err) {
    console.error("GET /api/clinic/appointments error:", {
      clinicId,
      dateString,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json(
      { error: "falha ao buscar agendamentos" },
      { status: 500 },
    );
  }
});
