import { PlanDetailsProps, PLANS as PLANS_LIMITS } from "@/utils/plans";

export async function getPlan(
  planId: keyof typeof PLANS_LIMITS,
): Promise<PlanDetailsProps> {
  return PLANS_LIMITS[planId];
}
