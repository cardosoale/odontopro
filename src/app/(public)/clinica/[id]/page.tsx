import { getinfoSchuduler } from "./_data-access/get-info-schuduler";
import { SchedulerContent } from "./_components/scheduler";

export default async function SchedulerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = await params;
  console.log("SchedulerPage userId:", userId);

  const user = await getinfoSchuduler({ userId });

  // Log the fetched user to help debugging and show a friendly public fallback if not found
  console.log("getinfoSchuduler result for userId:", userId, user);

  if (!user) {
    // Friendly fallback for public route when clinic not found
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl text-center p-6">
          <h1 className="text-2xl font-semibold mb-2">
            Clínica não encontrada
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Não encontramos a clínica que você está procurando. Verifique o link
            ou tente novamente mais tarde.
          </p>
          <a
            href="/"
            className="inline-block bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Voltar à página inicial
          </a>
        </div>
      </div>
    );
  }

  return <SchedulerContent clinic={user} />;
}
