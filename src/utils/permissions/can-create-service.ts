"use server";

import prisma from "@/lib/prisma";
import type { ResultPermissionProps } from "@/utils/permissions/can-permission";
import { checkSubscriptionExpired } from "@/utils/permissions/check-subscription-expired";
import { getPlan } from "@/utils/permissions/get-plans";
import { PLANS } from "@/utils/plans";
import type { Subscription } from "@prisma/client";
import type { Session } from "next-auth";

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

    // If the user has an active subscription, use the subscription's plan limits
    if (subscription && subscription.status === "active") {
      // getPlan expects a key of the PLANS object; cast accordingly
      const planLimits = await getPlan(subscription.plan as keyof typeof PLANS);

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS[subscription.plan as keyof typeof PLANS],
      };
    }

    // No active subscription: check trial/expired status
    const checkUserLimit = await checkSubscriptionExpired(session);

    // If checkSubscriptionExpired returned plan details (e.g. TRIAL), apply those limits
    if (checkUserLimit.planId === "TRIAL" && checkUserLimit.plan) {
      const planLimits = checkUserLimit.plan;

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: "TRIAL",
        expired: false,
        plan: planLimits,
      };
    }

    // For expired or other cases, return the result from checkSubscriptionExpired
    return checkUserLimit;
  } catch (err) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }
}
