import prisma from '@/lib/prisma';

/**
 * Assigns favorite states to a user.
 *
 * @param userId - The ID of the user.
 * @param statesIds - An array of state IDs to be assigned as favorites.
 */
export async function assignFavoriteStatesToUser(
  userId: number,
  statesIds: number[]
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
          savedStates: {
            connect: statesIds.map((id) => ({ id })),
          },
        },
      });
    } else {
      await prisma.userPreferences.update({
        where: { userId },
        data: {
          savedStates: {
            set: [],
            connect: statesIds.map((id) => ({ id })),
          },
        },
      });
    }

    return userPreferences;
  } catch (error) {
    console.error('Error assigning favorite states:', error);
  }
}
