import Image from "next/image";
import fotoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Prisma } from "@prisma/client";
import { PremiumCardBadge } from "./premium-badge";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clinicas disponíveis
        </h2>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((clinic) => (
            <div
              className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg duration-300 flex flex-col h-full"
              key={clinic.id}
            >
              {/* Imagem no topo sem margem */}
              <div className="relative h-48 w-full shrink-0">
                <Image
                  src={clinic.image ?? fotoImg}
                  alt="Foto da clinica"
                  fill
                  className="object-cover"
                />

                {/* Badge Premium */}
                {clinic?.subscription?.status === "active" &&
                  clinic?.subscription?.plan === "PROFESSIONAL" && (
                    <PremiumCardBadge />
                  )}
              </div>

              {/* Informações */}
              <div className="px-6 py-4 space-y-2 flex-1 flex flex-col">
                <h3 className="font-semibold text-base leading-none">
                  {clinic.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {clinic.address ?? "Endereço não informado."}
                </p>
              </div>

              {/* Botão sempre no final */}
              <div className="px-6 py-4 shrink-0">
                <Link
                  href={`/clinica/${clinic.id}`}
                  target="_blank"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium transition-colors"
                >
                  Agendar horário
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
