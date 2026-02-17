'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

type AppointmentsWhithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const { data, isLoading } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${date}`;

      const response = await fetch(url);

      const json = (await response.json()) as AppointmentsWhithService[];

      console.log(json);

      if (!response.ok) return [];

      return json;
    },
  });

  const occupantmap: Record<string, AppointmentsWhithService> = {};

  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);
      const startIndex = times.indexOf(appointment.time);

      if (startIndex != -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i;

          if (slotIndex < times.length) {
            occupantmap[times[slotIndex]] = appointment;
          }
        }
      }
    }
  }
  return (
    <Card>
      <CardHeader className=' flex items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-xl md:text-2xl font-bold'>
          Agendamentos
        </CardTitle>
        <button>SELECIONAR DATA</button>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4'>
          {isLoading ? (
            <p>Carregando agenda...</p>
          ) : (
            times.map((slot) => {
              const occupant = occupantmap[slot];
              if (occupant) {
                return (
                  <div
                    key={slot}
                    className='flex items-center py-2 border-t last:border-b'
                  >
                    <div className='w-16 text-sm font-semibold'>{slot}</div>
                    <div className=' flex-1 text-sm'>
                      <div className='font-semibold'>{occupant.name}</div>
                      <div className='text-sm text-gray-500'>
                        {occupant.phone}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={slot}
                  className='flex items-center py-2 border-t last:border-b'
                >
                  <div className='w-16 text-sm font-semibold'>{slot}</div>
                  <div className=' flex-1 text-sm text-gray-500'>
                    Disponível
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
