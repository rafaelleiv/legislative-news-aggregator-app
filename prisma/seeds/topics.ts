import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topics = [
  { name: 'General' },
  { name: 'Politics' },
  { name: 'Economy' },
  { name: 'Education' },
  { name: 'Health' },
  { name: 'Entertainment' },
  { name: 'Sports' },
  { name: 'Technology' },
  { name: 'Business' },
  { name: 'Science' },
];

export async function seedTopics() {
  // Clean the table before inserting seeds
  await prisma.topic.deleteMany({});

  for (const topic of topics) {
    const normalizedTopic = topic.name.toLowerCase();
    await prisma.topic.upsert({
      where: { name: normalizedTopic },
      update: {},
      create: {
        name: normalizedTopic,
      },
    });
  }
  console.log('Topics seeded or updated.');
}
