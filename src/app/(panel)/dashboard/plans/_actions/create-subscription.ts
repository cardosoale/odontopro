'use server';

import { auth } from '@/lib/auth';
import { Plan } from '@prisma/client';

interface CreateSubscriptionProps {
  type: Plan;
}

export async function createSubscription({ type }: CreateSubscriptionProps) {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return {
      userId: '',
      error: 'Falha ao criar assinatura',
    };
  }

  console.log('Ativar Plano: ', type);

  return {
    sessionId: 123,
  };
}
