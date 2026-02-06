'use client';

import { useSearchParams } from 'next/navigation';

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  return (
    <div>
      <h1>Listagem de horários</h1>
    </div>
  );
}
