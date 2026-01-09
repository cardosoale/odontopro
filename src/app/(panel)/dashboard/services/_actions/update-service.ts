'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
  serviceId: z.string().min(1, { message: 'Id é obrigatório' }),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  price: z.number().min(1, { message: 'Preço é obrigatório' }),
  duration: z.number(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function updateService(formData: FormSchemaType) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Você precisa estar logado para editar um serviço',
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: 'Falha ao atualizar serviço',
    };
  }

  try {
    const updatedService = await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
      },
    });

    revalidatePath('/dashboard/services');

    return {
      data: updatedService,
    };
  } catch (err) {
    return {
      error: 'Falha ao atualizar serviço',
    };
  }
}
