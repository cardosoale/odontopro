import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * DEV ONLY: Debug endpoint to inspect appointments in the database
 * Returns raw appointments for the authenticated clinic on a given date
 */
export const GET = auth(async function GET(request) {
  if (!request.auth?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const clinicId = request.auth.user.id;
  const dateString = request.nextUrl.searchParams.get("date");

  if (!dateString) {
    return NextResponse.json({ error: "date param required" }, { status: 400 });
  }

  try {
    const [year, month, day] = dateString.split("-").map(Number);

    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

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

    return NextResponse.json(
      {
        clinicId,
        dateString,
        searchRange: {
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        },
        count: appointments.length,
        appointments,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Dev debug error:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 },
    );
  }
});
