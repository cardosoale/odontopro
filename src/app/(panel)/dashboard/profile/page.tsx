import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { ProfileContent } from './_components/profile';
import { getUserData } from './_data-access/get-data-user';

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = await getUserData({ userid: session.user.id });

  if (!user) redirect('/');
  console.log('getUserdata: ', user);

  return (
    <section>
      <ProfileContent user={user} />
    </section>
  );
}
