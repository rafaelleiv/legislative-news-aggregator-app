import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={'px-5 py-3 bg-white shadow-sm font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            alt={'Logo'}
            width={50}
            height={30}
            priority
          />
        </Link>

        <div className={'flex items-center gap-5 text-black'}>
          {session && session.user ? (
            <>
              <Link href={'/news/create'}>
                <span>Create News</span>
              </Link>
              <Link href={`/user/${session?.user?.id}`}>
                <span>Profile</span>
              </Link>
              <form
                action={async () => {
                  'use server';

                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type={'submit'}>Logout</button>
              </form>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  'use server';

                  await signIn('github');
                }}
              >
                <button type={'submit'}>Login</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
