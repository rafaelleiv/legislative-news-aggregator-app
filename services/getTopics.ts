import prisma from '@/lib/prisma';

export async function getTopics() {
  try {
    const topics = await prisma.topic.findMany();

    return topics;
  } catch (err) {
    console.error(err, 'Error fetching topics');

    return [];
  }
}
