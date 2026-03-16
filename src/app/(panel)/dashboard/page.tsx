import { Button } from "@/components/ui/button";
import getSession from "@/lib/getSession";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ButtonCopyLink } from "./_components/button-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { checkSubscription } from "@/utils/permissions/check-subscription";
import { LabelSubscription } from "@/components/ui/label-subscription";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const subscription = await checkSubscription(session.user?.id);

  return (
    <main>
      <div className="flex space-x-2 items-center justify-end">
        <Button asChild className="bg-emerald-500 hover:bg-emerald-400   gap-2">
          <Link href={`/clinica/${session.user?.id}`} target="_blank">
            <Calendar1Icon className="w-5 h-5" />
            <span>Novo Agendamento</span>
          </Link>
        </Button>
        <ButtonCopyLink userId={session.user?.id} />
      </div>
      {subscription.subscriptionStatus === "EXPIRED" && (
        <LabelSubscription expired={true} />
      )}

      {subscription.subscriptionStatus === "TRIAL" && (
        <div
          className="bg-green-500 text-white text-sm md:text-base
          px-3 py-1 mt-2 rounded-md"
        >
          <p className="font-semibold">{subscription.message}</p>
        </div>
      )}

      {subscription.subscriptionStatus !== "EXPIRED" && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <Appointments userId={session.user?.id} />

          <Reminders userId={session.user?.id} />
        </section>
      )}
    </main>
  );
}
