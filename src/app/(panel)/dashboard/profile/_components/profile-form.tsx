'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UseProfileFormProps {
  name: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timeZone: string | null;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timeZone: z.string().min(1, { message: 'O timeZone é obrigatório' }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm(user: UseProfileFormProps | null) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      address: user?.address || '',
      phone: user?.phone || '',
      status: user?.status === true ? 'active' : 'inactive',
      timeZone: user?.timeZone || '',
    },
  });
}
