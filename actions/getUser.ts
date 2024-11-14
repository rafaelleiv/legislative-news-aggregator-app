import prisma from '@/lib/prisma';
import { User } from '@/prisma/interfaces';

export async function getUser(id: string): Promise<User | null> {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        preferences: {
          select: {
            savedTopics: true,
            savedStates: true,
          },
        },
      },
    });

    if (!res) {
      console.log('Failed to fetch user');
      return null;
    }

    return {
      ...res,
      password: null,
    } as User;
  } catch (err) {
    console.error(err, 'Error fetching user');
    return null;
  }
}
