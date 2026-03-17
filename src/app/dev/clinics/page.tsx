"use server";

import prisma from "@/lib/prisma";

export default async function DevClinicsPage() {
  // Apenas carrega um subconjunto seguro de campos para debugging
  const clinics = await prisma.user.findMany({
    select: { id: true, name: true, email: true, status: true },
    orderBy: { name: "asc" },
  });

  // Proteção simples para evitar exposição em produção
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Página de desenvolvimento</h1>
          <p className="text-sm text-gray-600">
            Esta página só deve ser usada em desenvolvimento. Defina{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">NODE_ENV=development</code> para habilitá-la.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">DEV: Clínicas</h1>
        <p className="mb-6 text-sm text-gray-600">
          Lista de clínicas do banco de dados. Use os IDs para testar a rota{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">/clinica/&lt;id&gt;</code>.
        </p>

        {clinics.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma clínica encontrada.</p>
        ) : (
          <div className="grid gap-3">
            {clinics.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm"
              >
                <div>
                  <div className="font-medium">{c.name ?? "(sem nome)"}</div>
                  <div className="text-xs text-gray-500">{c.email}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {c.status ? "Ativa" : "Inativa"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="mb-2">
                    <a
                      href={`/clinica/${c.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline text-sm"
                    >
                      Abrir
                    </a>
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    ID: <code className="bg-gray-100 px-1 py-0.5 rounded">{c.id}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
