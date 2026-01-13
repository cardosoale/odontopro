'use client';

import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';
import { MapPinIcon } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { AppointmentFormData, useAppointmentForm } from './scheduler-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatPhone } from '@/utils/format-phone';

import 'react-datepicker/dist/react-datepicker.css';
import { DateTimePicker } from './date-picker';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { use, useState } from 'react';

type UserWhihServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    services: true;
    subscription: true;
  };
}>;

interface SchedulerContentProps {
  clinic: UserWhihServiceAndSubscription;
}

export function SchedulerContent({ clinic }: SchedulerContentProps) {
  const form = useAppointmentForm();

  interface TimeSlot {
    time: string;
    isAvailable: boolean;
  }

  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Horários bloqueados
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  async function handleRegisterAppointments(formData: AppointmentFormData) {
    console.log(formData);
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='h-32 bg-emerald-500' />

      <section className='container mx-auto px-4 -mt-16'>
        <div className='max-w-2xl mx-auto'>
          <article className='flex flex-col items-center'>
            <div className='relative w-48 h-48 rounded-full overflow-hidden border-2 border-white mb-8'>
              <Image
                src={clinic.image ? clinic.image : imgTest}
                alt='Foto da clinica'
                className='object-cover'
                fill
              />
            </div>

            <h1 className='text-2xl font-bold mb-2'>{clinic.name}</h1>
            <div className='flex items-center gap-1'>
              <MapPinIcon className='w-5 h-5' />
              <span>
                {clinic.address ? clinic.address : 'Endereço não informado'}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section className='mx-auto max-w-2xl w-full mt-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterAppointments)}
            className='mx-2 space-y-6 bg-white p-6 border border-md shadow-sm '
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      id='name'
                      placeholder='Digite seu nome completo'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      placeholder='Digite seu email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='my-2'>
                  <FormLabel className='font-semibold'>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='phone'
                      placeholder='(XX) XXXXX-XXXX'
                      onChange={(e) => {
                        const formatedValue = formatPhone(e.target.value);
                        field.onChange(formatedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex items-center gap-5 space-y-1'>
                  <FormLabel className='font-semibold'>
                    Data do agendamento
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className='w-full rounded border p-2'
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='serviceId'
              render={({ field }) => (
                <FormItem className='flex items-center gap-5 space-y-1'>
                  <FormLabel className='font-semibold'>
                    Selecione o serviço desejado
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione um serviço' />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name} - {Math.floor(service.duration / 60)}
                            h {service.duration % 60}min
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {clinic.status ? (
              <Button
                type='submit'
                disabled={
                  !form.watch('date') ||
                  !form.watch('serviceId') ||
                  !form.watch('name') ||
                  !form.watch('email') ||
                  !form.watch('phone')
                }
                className='w-full bg-emerald-500 hover:bg-emerald-400'
              >
                Confirmar agendamento
              </Button>
            ) : (
              <p className='bg-red-400 text-white w-full rounded-md px-4 py-2 text-center'>
                Clinica Inativa
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  );
}
