import { PrismaClient } from '@prisma/client';
import { saltAndHashPassword } from '@/lib/utils';

const prisma = new PrismaClient();

export async function CreateSampleUser() {
  const email = 'johndoe@example.com';
  const password = 'test123';

  // Hash the password using saltAndHashPassword
  const hashedPassword = saltAndHashPassword(password);

  // Retrieve all existing topics
  const topics = await prisma.topic.findMany();

  // Create the user in the database and assign all topics
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: email,
      password: hashedPassword,
      preferences: {
        create: {
          savedTopics: {
            connect: topics.map((topic) => ({ id: topic.id })),
          },
        },
      },
    },
  });

  console.log('Default user John Doe created with email:', email, 'and assigned all topics.');
}
