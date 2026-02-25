import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { GridPlans } from './components/grid-plans';

export default async function Plans() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return <GridPlans />;
}
