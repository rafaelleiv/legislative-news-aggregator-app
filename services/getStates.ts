import prisma from '@/lib/prisma';

export async function getStates() {
  try {
    const states = await prisma.state.findMany();

    return states;
  } catch (err) {
    console.error(err, 'Error fetching states');

    return [];
  }
}
