'use server';

import prisma from '@/lib/prisma';
import { tr } from 'zod/v4/locales';

export async function getTimesClinic({ userId }: { userId: string }) {
  if (!userId) {
    return {
      times: [],
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    });

    if (!user) {
      return {
        times: [],
      };
    }

    return {
      times: user.times,
      userId: user.id,
    };
  } catch (err) {
    console.log(err);
    return {
      times: [],
    };
  }
}
