'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const reminderSchema = z.object({
  description: z
    .string()
    .min(10, 'A descrição do lembrete deve ter no min 10 caracteres'),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;

export function useReminderForm() {
  return useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      description: '',
    },
  });
}
