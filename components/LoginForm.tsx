import React from 'react';
import LoginManualButton from '@/components/LoginManualButton';
import LoginGithubButton from '@/components/LoginGithubButton';

const LoginForm = () => {
  return (
    <>
      <LoginGithubButton />

      <div className="w-px h-6 bg-gray-200"></div>

      <LoginManualButton />
    </>
  );
};

export default LoginForm;
