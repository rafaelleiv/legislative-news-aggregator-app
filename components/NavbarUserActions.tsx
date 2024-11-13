import React from 'react';
import { Session } from '@/app/context/SessionContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BadgePlus } from 'lucide-react';
import { NavBarUserOptions } from '@/components/NavBarUserOptions';
import { auth } from '@/auth';
import { getUser } from '@/actions/getUser';
import LoginForm from './LoginForm';

const NavbarUserActions = async () => {
  const session: Session | null = await auth();

  if (!session || session.id == null || session.id === 0) {
    return <LoginForm />;
  }

  const currentUser = await getUser(session.id.toString());

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <>
      <Button asChild className={'bg-white hover:bg-white-100'}>
        <Link href={'/news/create'}>
          <BadgePlus className={'size-6'} />
          <span className={'max-sm:hidden'}>Create</span>
        </Link>
      </Button>
      <NavBarUserOptions />
    </>
  );
};

export default NavbarUserActions;
