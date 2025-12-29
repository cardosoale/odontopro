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
  name: string;
  price: string;
  hour: string;
  minutes: string;
}

export type DialogServiceFormData = z.infer<typeof formSchema>;

export function useDialogServiceForm(
  service: UseDialogServiceFormProps | null
) {
  return useForm<DialogServiceFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service?.name || '',
      price: service?.price || '',
      hour: service?.hour || '',
      minutes: service?.minutes || '',
    },
  });
}
