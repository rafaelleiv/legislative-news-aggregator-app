import prisma from '@/lib/prisma';
import { User } from '@/prisma/interfaces';

export async function getUser(id: string): Promise<User | null> {
  try {
    const res = prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        preferences: {
          include: {
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

    return res;
  } catch (err) {
    console.error(err, 'Error fetching user');
    return null;
  }
}
