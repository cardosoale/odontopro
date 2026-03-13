import { Plan } from '@prisma/client';
import {
  PlanProps,
  PlanDetailsProps,
  PLANS as PLANS_LIMITS,
} from '@/utils/plans';

export async function getPlan(planId: Plan) {
  return PLANS_LIMITS[planId];
}
