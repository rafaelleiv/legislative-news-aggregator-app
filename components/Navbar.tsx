import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavbarUserActions from '@/components/NavbarUserActions';

const Navbar = async () => {
  return (
    <header className={'px-5 py-3 bg-white shadow-sm font-work-sans'}>
      <nav className={'flex justify-between items-center'}>
        <Link href={'/'}>
          <div className={'flex flex-col md:flex-row'}>
            <Image
              src={'/logo.png'}
              alt={'Logo'}
              width={50}
              height={30}
              priority
            />

            <h1 className={'hidden sm:block md:text-2xl px-3'}>
              Legislative News
            </h1>
          </div>
        </Link>

        <div className={'flex items-center gap-5 text-black'}>
          <NavbarUserActions />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
