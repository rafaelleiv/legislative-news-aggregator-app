'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

export function FilterDialog() {
  // Define state for the input values
  const [name, setName] = useState('Pedro Duarte');
  const [username, setUsername] = useState('@peduarte');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Search className={'size-6'} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-white">
        <DialogHeader>
          <DialogTitle>News filters</DialogTitle>
          <DialogDescription>
            Apply filters to find the news you are looking for
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name} // Use state value
              onChange={(e) => setName(e.target.value)} // Update state on change
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username} // Use state value
              onChange={(e) => setUsername(e.target.value)} // Update state on change
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
