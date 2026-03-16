"use server";
import type { ResultPermissionProps } from "@/utils/permissions/can-permission";
import { addDays, isAfter } from "date-fns";
import { Session } from "next-auth";
import { TRIAL_DAYS } from "./trial-limits";
import { getPlan } from "@/utils/permissions/get-plans";

export async function checkSubscriptionExpired(
  session: Session,
): Promise<ResultPermissionProps> {
  const trialDaysEnd = addDays(session.user.createdAt!, TRIAL_DAYS);

  if (isAfter(new Date(), trialDaysEnd)) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const plan = await getPlan("TRIAL" as any);

  return {
    hasPermission: true,
    planId: "TRIAL",
    expired: false,
    plan,
  };
}
