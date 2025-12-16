import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { ProfileContent } from './_components/profile-content';

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = session?.user?.id;

  if (!user) redirect('/');
  console.log('getUserdata: ', user);

  return (
    <section>
      <ProfileContent />
    </section>
  );
}
