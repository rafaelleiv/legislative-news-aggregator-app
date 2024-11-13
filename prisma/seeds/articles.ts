import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedArticles() {
  const articles = [
    {
      title:
        'Travis Kelce says brother Jason was defending his family in phone-smashing incident',
      publishedAt: new Date(Date.now() - 86400000),
      summary:
        'Jason Kelce said he regrets interacting with the person who taunted him Saturday, saying: “I know now that I shouldn’t have done that.”',
      link: 'https://www.nbcnews.com/pop-culture/pop-culture-news/travis-kelce-says-brother-jason-was-defending-family-phone-smashing-in-rcna178948',
      views: 0,
      image:
        'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-09/240910-travis-jason-kelce-ch-0716-974e79.jpg',
      slug: 'travis-kelce-says-brother-jason-was-defending-family-phone-smashing-incident',
      authorName: 'Marlene Lenthang',
    },
  ];

  const topicNames = ['Sports', 'Energy'];
  const topics = await prisma.topic.findMany({
    where: {
      name: { in: topicNames },
    },
  });

  const statesNames = ['California', 'New York'];
  const states = await prisma.state.findMany({
    where: {
      name: { in: statesNames },
    },
  });

  for (const articleData of articles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug }, // Usa el slug para evitar duplicados
      update: {
        title: articleData.title,
        publishedAt: articleData.publishedAt,
        summary: articleData.summary,
        link: articleData.link,
        views: articleData.views,
        image: articleData.image,
        states: {
          set: states.map((state) => ({ id: state.id })),
        },
        topics: {
          set: topics.map((topic) => ({ id: topic.id })),
        },
        authorName: articleData.authorName,
      },
      create: {
        ...articleData,
        topics: {
          connect: topics.map((topic) => ({ id: topic.id })),
        },
        states: {
          connect: states.map((state) => ({ id: state.id })),
        },
      },
    });

    console.log('Article seeded or updated.');
  }
}
