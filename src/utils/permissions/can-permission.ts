'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getPlan } from '@/utils/permissions/get-plans';
import type { PlanDetailsProps } from '@/utils/plans';

export type PLAN_PROPS = 'BASIC' | 'PROFESSIONAL' | 'EXPIRED' | 'TRIAL';

interface ResultPermissionprops {
  hasPermission: boolean;
  planId: PLAN_PROPS;
  expired: boolean;
  plan: PlanDetailsProps | null;
}

interface CanPermissionProps {
  type: string;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionprops> {
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

  if (!subscription) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  switch (type) {
    case 'service':
      // verificar conforme plano ativo
      return {
        hasPermission: false,
        planId: 'EXPIRED',
        expired: true,
        plan: null,
      };

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
