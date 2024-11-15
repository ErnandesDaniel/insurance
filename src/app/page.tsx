
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

export default async function Home() {
  //const session = await auth();
  //const user = session?.user;
  if (false) {
    //logged users
    return redirect('/dashboard/projects');
  }
  // not logged users
  return redirect('/login/auth');
}







