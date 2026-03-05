import { stripe } from '@/utils/stripe';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

export const POST = async (request: Request) => {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  console.log('Received webhook with signature:', signature);

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session completed:', checkoutSession);
      break;

    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      console.log('Subscription deleted:', subscriptionDeleted);
      break;

    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscriptionUpdated);
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
      break;
  }

  return new NextResponse('Webhook received', { status: 200 });
};
