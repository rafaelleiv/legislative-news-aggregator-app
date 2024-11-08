import prisma from '@/lib/prisma';
import { Article } from '@/prisma/interfaces';
import { auth } from '@/auth';
import slugify from 'slugify';

export type InputArticle = Omit<
  Article,
  | 'id'
  | 'author'
  | 'authorId'
  | 'authorName'
  | 'publishedAt'
  | 'slug'
  | 'views'
  | 'state'
>;

export async function postArticle(article: InputArticle) {
  const session = await auth();

  if (!session) throw new Error('Unauthorized');

  try {
    const newArticle = await prisma.article.create({
      data: {
        title: article.title,
        summary: article.summary,
        link: article.link,
        topics: {
          connect: article.topics?.map((topic) => ({ id: topic.id })),
        },
        image: article.image,
        publishedAt: new Date(),
        slug: slugify(article.title as string, { lower: true, strict: true }),
        author: {
          connect: {
            id: session.user.id,
          },
        },
        authorName: session.user.name,
      },
    });

    return {
      status: 201,
      data: newArticle,
    };
  } catch (err) {
    console.error(err, 'Error creating article');

    throw new Error('Error creating article');
  }
}
