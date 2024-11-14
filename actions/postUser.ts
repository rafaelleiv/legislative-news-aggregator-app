import prisma from '@/lib/prisma';
import { User } from '@/prisma/interfaces';
import { assignFavoriteTopicsToUser } from '@/actions/assignFavoriteTopicsToUser';

export async function postUser(user: {
  email: string;
  name: string;
  image: string;
}): Promise<User | null> {
  try {
    // Create the user
    const res = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        image: user.image,
      },
    });

    if (!res) return null;

    // if the user is created, create a userPreferences entry for "General" topic
    // Find or create the "general" topic
    let generalTopic = await prisma.topic.findUnique({
      where: { name: 'general' },
    });

    // If the "general" topic doesn't exist, create it
    if (!generalTopic) {
      generalTopic = await prisma.topic.create({
        data: { name: 'general' },
      });
    }

    // Assign the "general" topic to the user
    const preferences = await assignFavoriteTopicsToUser(res.id, [generalTopic.id]);

    return {
      ...res,
      preferences,
    };
  } catch (err) {
    console.error(err, 'Error creating user');
    return null;
  }
}
