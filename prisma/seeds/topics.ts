import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topics = [
  { name: 'Politics' },
  { name: 'Economy' },
  { name: 'Education' },
  { name: 'Health' },
  { name: 'Environment' },
  { name: 'Sports' },
  { name: 'Technology' },
  { name: 'Transportation' },
  { name: 'Public Safety' },
  { name: 'Housing' },
  { name: 'Civil Rights' },
  { name: 'Agriculture' },
  { name: 'Energy' },
  { name: 'Labor' },
  { name: 'Immigration' },
  { name: 'Infrastructure' },
  { name: 'Welfare' },
  { name: 'Criminal Justice' },
  { name: 'Social Services' },
  { name: 'Urban Development' },
  { name: 'Rural Affairs' },
];

export async function seedTopics() {
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: {
        name: topic.name,
      },
    });
  }
  console.log('Topics seeded or updated.');
}
