import { redirect } from 'next/navigation';
import { getinfoSchuduler } from './_data-access/get-info-schuduler';
import { SchedulerContent } from './_components/scheduler';

export default async function SchedulerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getinfoSchuduler({ userId: userId });
  console.log(user);

  // TODO CRIAR PAGINA 404
  if (!user) redirect('/');

  return <SchedulerContent clinic={user} />;
}
