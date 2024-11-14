import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
import { postUser } from '@/actions/postUser';
import { User as CustomUser } from '@/prisma/interfaces';
import { getUserByEmailAndPassword } from '@/actions/getUserByEmailAndPassword';

function mapCustomUserToAuthUser(user: CustomUser): {
  id: string;
  name: string;
  email: string;
  image: string;
} {
  return {
    id: user.id.toString(),
    name: user.name || '',
    email: user.email,
    image: user.image || '',
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const customUser = await getUserByEmailAndPassword(
          credentials.email as string,
          credentials.password as string
        );

        if (!customUser) {
          throw new Error("Invalid credentials.");
        }

        return mapCustomUserToAuthUser(customUser);
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      console.log('redirecttttttt', baseUrl);
      return baseUrl + '/';
    },
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
      profile,
    }: {
      token: { id: string; email: string };
      profile: {
        email: string;
      };
    }) {
      // if (account && profile) {
      const user = await prisma.user.findUnique({
        where: { email: profile?.email || token?.email },
      });

      if (user) {
        token.id = user.id.toString(); // Ensure id is stored as string
        token.email = user.email;
      }
      // }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: {
        id: string;
        user: { preferences: { savedTopics: number[]; savedStates: number[] } };
      };
      token: { id: string; email: string };
    }) {
      if (token.id) {
        const user = await prisma.user.findUnique({
          where: { id: parseInt(token.id, 10) }, // Ensure token.id is converted to a number
          select: {
            preferences: {
              select: {
                savedTopics: true,
                savedStates: true,
              },
            },
          },
        });

        Object.assign(session, {
          id: token.id,
          user: {
            ...session.user,
            preferences: user?.preferences || {},
          },
        });
      } else {
        console.error('No user ID found in token.');
      }

      return session;
    },
  },
  trustHost: true,
});
