import prisma from "@/lib/prisma";
import { addDays, differenceInDays, isAfter } from "date-fns";
import { TRIAL_DAYS } from "./trial-limits";

export async function checkSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    throw new Error("Usuário no encontrado");
  }

  if (user.subscription && user.subscription.status === "active") {
    return {
      subscriptionStatus: "ACTIVE",
      message: "Você está com uma assinatura ativa",
      planId: user.subscription.plan,
    };
  }

  const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);

  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: "EXPIRED",
      message: "Seu periodo de teste expirou",
      planId: "TRIAL",
    };
  }

  const daysRemanining = differenceInDays(trialEndDate, new Date());

  return {
    subscriptionStatus: "TRIAL",
    message: `Você está no periodo de teste, faltam ${daysRemanining} dias!
    Aproveite 🤩`,
    planId: "TRIAL",
  };
}
