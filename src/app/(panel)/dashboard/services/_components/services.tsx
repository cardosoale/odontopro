"use server";

import { canPermission } from "@/utils/permissions/can-permission";
import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServicesContentProps {
  userId: string;
}

export default async function ServicesContent({
  userId,
}: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });
  const permissions = await canPermission({ type: "service" });

  return (
    <>
      {permissions.planId === "TRIAL" && (
        <div>
          <p className="text-sm text-center text-gray-500">
            Você está no periodo de testes. Seus beneficios são iguais ao plano
            BASIC. Caso precise de mais beneficios considere assinar o plano
            PROFESSIONAL
          </p>
        </div>
      )}
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}
      <ServicesList services={services.data || []} permissions={permissions} />
    </>
  );
}
