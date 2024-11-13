import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
import { postUser } from '@/actions/postUser';
import { UserPreferences } from '@/prisma/interfaces';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
    }: {
      user: { name: string; email: string; image: string };
    }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!existingUser) {
        await postUser({ email, name, image });
      }

      return true;
    },
    async jwt({
      token,
      account,
      profile,
    }: {
      token: { id: string | null };
      account: { provider: string; type: string };
      profile: { id: string; email: string };
    }) {
      if (account && profile) {
        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        token.id = user?.id?.toString() || null;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: {
        id: string;
        user: {
          name: string;
          email: string;
          image: string;
          preferences?: UserPreferences;
        };
      };
      token: { id: string };
    }) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(token.id) }, // Convertimos token.id a número si es una cadena
        select: {
          preferences: {
            select: {
              savedTopics: true, // Include savedTopics if you need them too
              savedStates: true, // Include savedStates if you need them too
            },
          },
        },
      });

      // Add user preferences to the session
      Object.assign(session, {
        id: token.id,
        user: {
          ...session.user,
          preferences: user?.preferences || {},
        },
      });

      return session;
    },
  },
  trustHost: true,
});
