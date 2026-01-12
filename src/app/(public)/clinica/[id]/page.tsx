import { redirect } from 'next/navigation';
import { getinfoSchuduller } from './_data-access/get-info-schuduller';
import { SchudullerContent } from './_components/schuduller';

export default async function SchedullerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getinfoSchuduller({ userId: userId });
  console.log(user);

  // TODO CRIAR PAGINA 404
  if (!user) redirect('/');

  return <SchudullerContent />;
}
