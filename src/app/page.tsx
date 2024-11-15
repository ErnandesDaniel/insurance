
import { redirect } from 'next/navigation';

export default async function Home() {

  // not logged users
  return redirect('/login/auth');
}







