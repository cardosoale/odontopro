"use server";
import type { ResultPermissionProps } from "@/utils/permissions/can-permission";
import { addDays, isAfter } from "date-fns";
import { Session } from "next-auth";
import { TRIAL_DAYS } from "./trial-limits";
import { getPlan } from "@/utils/permissions/get-plans";
import { PLANS } from "@/utils/plans";

export async function checkSubscriptionExpired(
  session: Session,
): Promise<ResultPermissionProps> {
  // Debug: log session and createdAt to ensure correct values

  const trialDaysEnd = addDays(session.user.createdAt!, TRIAL_DAYS);

  if (isAfter(new Date(), trialDaysEnd)) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const plan = (await getPlan("TRIAL")) ?? PLANS.TRIAL;

  return {
    hasPermission: true,
    planId: "TRIAL",
    expired: false,
    plan,
  };
}
