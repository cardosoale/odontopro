import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = searchParams.get('userId');
  const dateParam = searchParams.get('date');

  if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
    return NextResponse.json(
      {
        error: 'Nenhum agendamento encontrado',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const [year, month, day] = dateParam.split('-').map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);
    console.log(startDate);
    console.log(endDate);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: 'Nenhum agendamento encontrado',
      },
      {
        status: 400,
      }
    );
  }
}
