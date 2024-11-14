import prisma from '@/lib/prisma';
import { User } from '@/prisma/interfaces';
import { verifyPassword } from '@/lib/utils';

export async function getUserByEmailAndPassword(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const res = await prisma.user.findFirst({
      where: {
        email,
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

    // verify password
    const isPasswordValid = verifyPassword(password, res.password as string);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return null;
    }

    console.log('User fetched successfully', res);

    return res;
  } catch (err) {
    console.error(err, 'Error fetching user');
    return null;
  }
}
