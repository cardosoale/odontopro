'use server';

import prisma from '@/lib/prisma';

interface GetUserDataProps {
  userid: string;
}

export async function getUserData({ userid }: GetUserDataProps) {
  if (!userid) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
      include: {
        subscription: true,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
