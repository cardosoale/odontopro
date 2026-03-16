"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { canPermission } from "@/utils/permissions/can-permission";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  price: z.number().min(1, { message: "Preço é obrigatório" }),
  duration: z.number(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export async function createNewService(formData: FormSchemaType) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Você precisa estar logado para criar um serviço",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: "Preencha os campos corretamente",
    };
  }

  try {
    // Verifica permissão do usuário no servidor antes de criar o serviço
    // Isso garante que limites de trial/plano sejam respeitados mesmo que a verificação no cliente falhe
    const permission = await canPermission({ type: "service" });

    if (!permission.hasPermission) {
      // Mensagem específica dependendo do estado retornado
      const message =
        permission.planId === "EXPIRED"
          ? "Seu período de testes expirou ou seu plano não permite criar mais serviços. Considere assinar um plano."
          : "Limite de serviços atingido. Atualize seu plano para adicionar mais serviços.";
      return {
        error: message,
      };
    }

    const newService = await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: formData.duration,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard/services");

    return {
      data: newService,
    };
  } catch (err) {
    return {
      error: "Erro ao criar serviço",
    };
  }
}
