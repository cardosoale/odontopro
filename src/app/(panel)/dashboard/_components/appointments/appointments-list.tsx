'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Prisma } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { EyeIcon, XIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { cancelAppointment } from '../../_actions/cancel-appointment';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogAppointment } from './dialog-appointment';

export type AppointmentsWhithService = Prisma.AppointmentGetPayload<{
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
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentsWhithService | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);

      const json = (await response.json()) as AppointmentsWhithService[];

      console.log(json);

      if (!response.ok) return [];

      return json;
    },
    staleTime: 499000,
    refetchInterval: 500000,
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

  function handleCancelAppointment(appointmentId: string) {
    toast('Deseja realmente cancelar este agendamento?', {
      action: {
        label: 'Confirmar',
        onClick: async () => {
          const response = await cancelAppointment({ appointmentId });

          if (response.error) {
            toast.error('Erro ao cancelar agendamento');
            return;
          }

          queryClient.invalidateQueries({ queryKey: ['get-appointments'] });
          await refetch();
          toast.success('Agendamento cancelado com sucesso');
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => toast.dismiss(),
      },
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      <div className='ml-auto '>
                        <div className='flex'>
                          <DialogTrigger asChild>
                            <Button
                              size={'icon'}
                              variant={'ghost'}
                              onClick={() => {
                                setDetailAppointment(occupant);
                              }}
                            >
                              <EyeIcon className='w-4 h-4' />
                            </Button>
                          </DialogTrigger>
                          <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => handleCancelAppointment(occupant.id)}
                          >
                            <XIcon className='w-4 h-4' />
                          </Button>
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
      <DialogAppointment appointment={detailAppointment} />
    </Dialog>
  );
}
