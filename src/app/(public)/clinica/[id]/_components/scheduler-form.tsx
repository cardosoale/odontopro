'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AppointmentSchema = z.object({
  name: z.string().min(5, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  phone: z.string().min(13, 'Telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'Serviço é obrigatório'),
});

export type AppointmentFormData = z.infer<typeof AppointmentSchema>;

export function useAppointmentForm() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceId: '',
      date: new Date(),
    },
  });
}
