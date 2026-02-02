import { Button } from '@/components/ui/button';
import getSession from '@/lib/getSession';
import { Calendar1Icon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ButtonCopyLink } from './_components/button-copy-link';
import { Reminders } from './_components/reminder/reminders';

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return (
    <main>
      <div className='flex space-x-2 items-center justify-end'>
        <Button asChild className='bg-emerald-500 hover:bg-emerald-400   gap-2'>
          <Link href={`/clinica/${session.user?.id}`} target='_blank'>
            <Calendar1Icon className='w-5 h-5' />
            <span>Novo Agendamento</span>
          </Link>
        </Button>
        <ButtonCopyLink userId={session.user?.id} />
      </div>
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
        <div>Agenda</div>
        <Reminders userId={session.user?.id} />
      </section>
    </main>
  );
}
