'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';


const LoginManualButton = () => {
  const router = useRouter();

  return (
    <>
      {/* Manual login button */}
      <Button
        className={'bg-white hover:bg-white-100'}
        onClick={() => router.push('/sign-in')}
      >
        <LogIn />
        Login
      </Button>
    </>
  );
};
export default LoginManualButton;
