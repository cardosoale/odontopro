'use client';

import { Button } from '@/components/ui/button';
import { Plan } from '@prisma/client';
import { createSubscription } from '../_actions/create-subscription';

interface SubscriptionPlanProps {
  type: Plan;
}

export function SubscriptionPlan({ type }: SubscriptionPlanProps) {
  async function handleCreateBilling() {
    const response = await createSubscription({ type: type });
  }

  return (
    <Button
      className={`w-full 
        ${type === 'PROFESSIONAL' && 'bg-emerald-500 hover:bg-emerald-400'}`}
      onClick={handleCreateBilling}
    >
      Assinar Plano
    </Button>
  );
}
