'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  price: z.string().min(1, { message: 'Preço é obrigatório' }),
  hour: z.string(),
  minutes: z.string(),
});

interface UseDialogServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hour: string;
    minutes: string;
  };
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm({
  initialValues,
}: UseDialogServiceFormProps) {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: '',
      price: '',
      hour: '',
      minutes: '',
    },
  });
}
