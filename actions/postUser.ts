import prisma from '@/lib/prisma';
import { User } from '@/prisma/interfaces';

export async function postUser(user: {
  email: string;
  name: string;
  image: string;
}): Promise<User | null> {
  try {
    const data = {
      email: user.email,
      name: user.name,
      image: user.image,
    };
    const res = await prisma.user.create({
      data,
    });

    return res;
  } catch (err) {
    console.error(err, 'Error creating user');
    return null;
  }
}
