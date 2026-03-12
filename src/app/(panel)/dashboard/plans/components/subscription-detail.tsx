'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans';
import type { Subscription } from '@prisma/client';

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  async function handleManageSubscription() {
    console.log('Teste');
  }

  const subscriptionInfo = subscriptionPlans.find(
    (plan) => plan.id === subscription.plan,
  );

  return (
    <Card className='w-full mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Seu plano atual</CardTitle>
        <CardDescription>Sua assinatura está ativa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg md:text-xl'>
            {subscription.plan === 'BASIC' ? 'BASIC' : 'PROFISSIONAL'}
          </h3>
          <div className='bg-green-400 text-white w-fit py-1 px-4 rounded-md font-semibold'>
            {subscription.status === 'active' ? 'ATIVO' : 'INATIVO'}
          </div>
        </div>
        <ul className='list-disc list-inside space-y-2'>
          {subscriptionInfo &&
            subscriptionInfo.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleManageSubscription}>Gerenciar assinatura</Button>
      </CardFooter>
    </Card>
  );
}
