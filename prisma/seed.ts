import { PrismaClient } from '@prisma/client';
import { seedStates } from '@/prisma/seeds/states';
import { seedTopics } from '@/prisma/seeds/topics';
import { seedArticles } from '@/prisma/seeds/articles';
import { CreateSampleUser } from '@/prisma/seeds/user';

const prisma = new PrismaClient();

/**
 * Main function to execute the seed scripts for states and topics.
 * It logs a message once all seeds are executed.
 */
async function main() {
  await seedStates();
  await seedTopics();
  await seedArticles();
  await CreateSampleUser();
  console.log('All seeds executed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
