'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  price: z.number().min(1, { message: 'Preço é obrigatório' }),
  duration: z.number(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function createNewService(formData: FormSchemaType) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Você precisa estar logado para criar um serviço',
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: 'Preencha os campos corretamente',
    };
  }

  try {
    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });
    return {
      data: newService,
    };
  } catch (err) {
    console.log(err);
    return {
      error: 'Erro ao criar serviço',
    };
  }
}
