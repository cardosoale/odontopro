'use server';
import type { ResultPermissionProps } from '@/utils/permissions/can-permission';
import { addDays, isAfter } from 'date-fns';
import { Session } from 'next-auth';

const TRIAL_DAYS = 7;

export async function checkSubscriptionExpired(
  session: Session,
): Promise<ResultPermissionProps> {
  const trialDaysEnd = addDays(session.user.createdAt!, 7);

  if (isAfter(new Date(), trialDaysEnd)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  };
}
