'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { State, Topic } from '@/prisma/interfaces';
import { getUserById } from '@/services/getUserById';
import { redirect } from 'next/navigation';

export interface Session {
  id?: number;
  user: {
    name: string;
    email: string;
    image: string;
    preferences: {
      savedTopics: Topic[];
      savedStates: State[];
    }
  };
}

interface SessionContextType {
  session: Session | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(session);

  useEffect(() => {
    const validateUser = async () => {
      if (currentSession && currentSession.id) {
        const user = await getUserById(currentSession.id);

        if (!user) {
          await invalidateSession();
        }
      }
    };

    validateUser().then();
  }, [currentSession]);

  const invalidateSession = async () => {
    setCurrentSession(null);
    redirect('/');
  };

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
