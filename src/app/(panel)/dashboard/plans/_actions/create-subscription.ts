'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
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
      error: 'Falha ao ativar plano',
    };
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return {
      sessionId: '',
      error: 'Falha ao ativar plano',
    };
  }

  let customerId = findUser.stripe_customer_id;

  if (!customerId) {
    // cadastrar no stripe
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email,
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripe_customer_id: stripeCustomer.id,
      },
    });
    customerId = stripeCustomer.id;
  }

  // CRIAR CHECKOUT
  try {
    const stripeCheckoutsession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card', 'pix'],
      billing_address_collection: 'required',
      line_items: [
        {
          price:
            type === 'BASIC'
              ? process.env.STRIPE_PRICE_BASIC
              : process.env.STRIPE_PRICE_PROFESSIONAL,
          quantity: 1,
        },
      ],
      metadata: {
        type: type,
      },
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return {
      sessionId: stripeCheckoutsession.id,
    };
  } catch (err) {
    console.log('Erro ao criar checkout:', err);
    return {
      sessionId: '',
      error: 'Falha ao ativar plano',
    };
  }
}
