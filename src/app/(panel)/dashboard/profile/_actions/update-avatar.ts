"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type UpdateAvatarParams = { avatarUrl?: string; avatarurl?: string };

export async function updateAvatar(params: UpdateAvatarParams) {
  const { avatarUrl, avatarurl } = params;
  const imageUrl = avatarUrl ?? avatarurl ?? "";

  const session = await auth();
  if (!session) {
    console.warn("updateAvatar: usuário não autenticado");
    return {
      error: "Usuário não autenticado",
    };
  }

  if (!imageUrl) {
    console.warn(
      "updateAvatar: imagem não fornecida para usuário",
      session.user?.id,
    );
    return {
      error: "Imagem não fornecida",
    };
  }

  try {
    const updated = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath("/dashboard/profile");
    console.log(
      "updateAvatar: imagem atualizada para usuário",
      session.user?.id,
    );
    return {
      data: "Imagem alterada com sucesso",
    };
  } catch (error) {
    console.error("updateAvatar error:", {
      userId: session.user?.id,
      imageUrl,
      error,
    });
    return {
      error: "Erro ao atualizar imagem",
    };
  }
}
