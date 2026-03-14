'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { canCreateService } from '@/utils/permissions/can-create-service';
import { getPlan } from '@/utils/permissions/get-plans';
import type { PlanDetailsProps } from '@/utils/plans';

export type PLAN_PROPS = 'BASIC' | 'PROFESSIONAL' | 'EXPIRED' | 'TRIAL';
type TypeCheck = 'service';

export interface ResultPermissionProps {
  hasPermission: boolean;
  planId: PLAN_PROPS;
  expired: boolean;
  plan: PlanDetailsProps | null;
}

interface CanPermissionProps {
  type: TypeCheck;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth();

  if (!session?.user.id) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  switch (type) {
    case 'service':
      const permission = await canCreateService(subscription, session);
      return permission;

    default: {
      return {
        hasPermission: false,
        planId: 'EXPIRED',
        expired: true,
        plan: null,
      };
    }
  }
}
