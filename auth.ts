import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import prisma from '@/lib/prisma';

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
        await prisma.user.create({
          data: {
            email: email,
            name: name,
            image: image,
          },
        });
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
      session: { id: string };
      token: { id: string };
    }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
