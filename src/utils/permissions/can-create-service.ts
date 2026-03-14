'use server';

import prisma from '@/lib/prisma';
import type { ResultPermissionProps } from '@/utils/permissions/can-permission';
import { checkSubscriptionExpired } from '@/utils/permissions/check-subscription-expired';
import { getPlan } from '@/utils/permissions/get-plans';
import { PLANS } from '@/utils/plans';
import type { Subscription } from '@prisma/client';
import type { Session } from 'next-auth';

export async function canCreateService(
  subscription: Subscription | null,
  session: Session,
): Promise<ResultPermissionProps> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user.id,
      },
    });

    if (subscription && subscription.status === 'active') {
      const plan = subscription.plan;
      const planLimits = await getPlan(plan);

      console.log('Limites do plano', planLimits);
      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS[subscription.plan],
      };
    }
    const checkUserLimit = await checkSubscriptionExpired(session);

    return checkUserLimit;
  } catch (err) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }
}
