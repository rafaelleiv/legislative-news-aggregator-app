import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';
import { SessionProvider } from '@/app/context/SessionContext';
import { WebSocketProvider } from '@/app/context/WebSocketContext';
import { Topic } from '@/prisma/interfaces';

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
  const topics: string[] = session?.user?.preferences?.savedTopics?.map(
    (t: Topic) => t.name
  ) || ['general'];

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <WebSocketProvider topics={topics}>
          <body className={workSans.variable} suppressHydrationWarning>
            {children}
            <Toaster />
          </body>
        </WebSocketProvider>
      </SessionProvider>
    </html>
  );
}
