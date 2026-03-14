"use server";

import { canPermission } from "@/utils/permissions/can-permission";
import { getAllServices } from "../_data-access/get-all-services";
import ServicesList from "./services-list";

interface ServicesContentProps {
  userId: string;
}

export default async function ServicesContent({
  userId,
}: ServicesContentProps) {
  const services = await getAllServices({ userId: userId });
  const permissions = await canPermission({ type: "service" });

  return (
    <ServicesList services={services.data || []} permissions={permissions} />
  );
}
