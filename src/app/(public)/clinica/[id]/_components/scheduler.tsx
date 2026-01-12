'use client';

import Image from 'next/image';
import imgTest from '../../../../../../public/foto1.png';
import { MapPinIcon } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { useAppointmentForm } from './scheduler-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='h-32 bg-emerald-500' />

      <section className='contianer mx-auto px-4 -mt-16'>
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

      <Form {...form}>
        <form className='mx-2 space-y-6 bg-white p-6 border border-md shadow-sm'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='my-2'>
                <FormLabel className='font-semibold'>Nome</FormLabel>
                <FormControl>
                  <Input
                    id='name'
                    placeholder='Digite seu nome aqui'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
