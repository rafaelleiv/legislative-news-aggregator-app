import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';
import { SessionProvider } from '@/app/context/SessionContext';

const workSans = localFont({
  src: [
    {
      path: '/fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-Thin.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-Light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '/fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: 'Legislative News',
  description: 'A news app for the legislative branch of the US government',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={workSans.variable}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
