'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchemaType) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Usuário não encontrado',
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: 'Dados inválidos',
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timeZone: formData.timeZone,
        times: formData.times || [],
      },
    });
    return {
      data: 'Perfil atualizado com sucesso',
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: 'Erro ao atualizar perfil',
    };
  }
}
