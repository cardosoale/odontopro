import prisma from '@/lib/prisma';
import Stripe from 'stripe';
import { stripe } from '@/utils/stripe';
import type { Plan } from '@prisma/client';

/**
 * Manages a subscription by creating or updating or deleting it based on the provided parameters.
 * Sincronizes the subscription data with the Stripe API and updates the local database accordingly.
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId - The Stripe subscription ID to manage.
 * @param {string} customerId - The Stripe customer ID associated with the
 *  subscription.
 * @param {bollean}  createAction - A flag indicating whether to create a new
 * subscription (true) or update/delete an existing one (false).
 * @param {boolean} deleteAction - A flag indicating whether to delete the
 * subscription (true) or update it (false). Only relevant if createAction
 * is false.
 * @param {Plan} [type] - The subscription plan to use when creating or updating
 * the subscription. Required if createAction is true or if updating an existing
 * subscription.
 * @returns {Promise<Response|void>} A promise that resolves when the subscription
 *  has been successfully managed, or rejects with an error if any operation
 * fails.
 *
 */

export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction: boolean,
  deleteAction: boolean,
  type?: Plan,
): Promise<Response | void> {
  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  });

  if (!findUser) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? 'BASIC',
  };

  try {
    if (subscriptionId && deleteAction) {
      await prisma.subscription.delete({
        where: {
          id: subscriptionData.id,
        },
      });
      return;
    }

    if (createAction) {
      await prisma.subscription.create({
        data: subscriptionData,
      });
      return;
    }

    await prisma.subscription.update({
      where: {
        id: subscriptionData.id,
      },
      data: subscriptionData,
    });
  } catch (error) {
    console.error('Error managing subscription:', error);
  }
}
