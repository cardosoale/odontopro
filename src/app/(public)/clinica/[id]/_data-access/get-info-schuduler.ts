"use server";

import prisma from "@/lib/prisma";

/**
 * Busca informações da clínica para o agendador público.
 * Usa `findUnique` porque procuramos pelo ID primário (único).
 */
export async function getinfoSchuduler({ userId }: { userId: string }) {
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
        services: {
          where: {
            status: true,
          },
        },
      },
    });

    return user ?? null;
  } catch (err) {
    // Log error with contexto para facilitar debugging em dev e re-throw para expor 500 quando apropriado
    console.error("getinfoSchuduler error for userId:", userId, err);
    throw err;
  }
}
