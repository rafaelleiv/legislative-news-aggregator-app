import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import React from 'react';
import { auth, signOut } from '@/auth';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

export async function UserNavBar() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={'size-10 hover:cursor-pointer'}>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>
            {getInitials(session?.user?.name || '')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className={'divider'} />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>
                <User />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className={'divider'} />
        <form
          className={'flex'}
          action={async () => {
            'use server';

            await signOut({ redirectTo: '/' });
          }}
        >
          <button type={'submit'} className={'flex-1'}>
            <DropdownMenuItem>
              <span>Logout</span>
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
