'use client';

import { Button } from '@/components/ui/button';
import { Plan } from '@prisma/client';
import { createSubscription } from '../_actions/create-subscription';
import { getStripeJs } from '@/utils/stripe-js';
import { toast } from 'sonner';

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const { sessionId, error, url } = await createSubscription({ type: type });
    if (error) {
      toast.error(error);
      return;
    }

    const stripe = await getStripeJs();

    if (stripe && url) {
      window.location.href = url;
    }
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
