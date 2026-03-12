import { manageSubscription } from '@/utils/manage-subscription';
import { stripe } from '@/utils/stripe';
import type { Plan } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

export const POST = async (request: Request) => {
  const parsePlan = (value?: string): Plan =>
    value === 'PROFESSIONAL' ? 'PROFESSIONAL' : 'BASIC';

  const getMetadataPlan = (metadata?: Stripe.Metadata | null): Plan =>
    parsePlan(metadata?.plan ?? metadata?.type);

  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    const text = await request.text();

    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const type = getMetadataPlan(checkoutSession.metadata);

        if (checkoutSession.subscription && checkoutSession.customer) {
          await manageSubscription(
            checkoutSession.subscription.toString(),
            checkoutSession.customer.toString(),
            true,
            false,
            type,
          );
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const paymentIntent = event.data.object as Stripe.Subscription;
        const typeUpdate = getMetadataPlan(paymentIntent.metadata);

        await manageSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false,
          false,
          typeUpdate,
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const payment = event.data.object as Stripe.Subscription;

        await manageSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true,
        );
        break;
      }

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }

    revalidatePath('/dashboard/plans');

    return new NextResponse('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
};
