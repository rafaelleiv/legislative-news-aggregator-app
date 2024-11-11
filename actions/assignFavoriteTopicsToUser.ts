import prisma from '@/lib/prisma';

/**
 * Assigns favorite topics to a user.
 *
 * @param userId - The ID of the user.
 * @param topicIds - An array of topic IDs to be assigned as favorites.
 */
export async function assignFavoriteTopicsToUser(
  userId: number,
  topicIds: number[]
) {
  try {
    // Check if the user already has preferences, otherwise create a new entry
    let userPreferences = await prisma.userPreferences.findUnique({
      where: { userId },
    });

    if (!userPreferences) {
      userPreferences = await prisma.userPreferences.create({
        data: {
          userId,
          savedTopics: {
            connect: topicIds.map((id) => ({ id })),
          },
        },
      });
    } else {
      await prisma.userPreferences.update({
        where: { userId },
        data: {
          savedTopics: {
            set: [],
            connect: topicIds.map((id) => ({ id })),
          },
        },
      });
    }

    return userPreferences;
  } catch (error) {
    console.error('Error assigning favorite topics:', error);
  }
}
