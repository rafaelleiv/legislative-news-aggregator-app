import React from 'react';
import { signOut } from '@/auth';

const Logout = () => {
  return (
    <form
      className={'flex items-center'}
      action={async () => {
        'use server';

        await signOut({ redirectTo: '/' });
      }}
    >
      <button type={'submit'}>
        <span>Logout</span>
      </button>
    </form>
  );
};
export default Logout;
