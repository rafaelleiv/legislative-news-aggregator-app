'use server';

import prisma from '@/lib/prisma';
import { Article } from '@/prisma/interfaces';
import { auth } from '@/auth';
import slugify from 'slugify';
import { parseServerActionResponse } from '@/lib/utils';

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

  if (!session) {
    return parseServerActionResponse({
      status: 'Error',
      error: 'Unauthorized',
      code: 401,
    });
  }

  const { title, summary, link, topics, image, states } = article;
  const slug = slugify(title as string, { lower: true, strict: true });
  const data = {
    title: title,
    summary: summary,
    link: link,
    topics: {
      connect: topics?.map((topic) => ({ id: topic.id })),
    },
    states: {
      connect: states?.map((state) => ({ id: state.id })),
    },
    image: image,
    publishedAt: new Date(),
    slug: slug,
    views: 0,
    author: {
      connect: {
        id: +session.id,
      },
    },
    authorName: session.user.name,
  };
  try {
    const newArticle = await prisma.article.create({
      data: data,
    });

    return {
      status: 201,
      data: newArticle,
    };
  } catch (err) {
    console.error(err, 'Error creating article');

    return parseServerActionResponse({
      status: 'Error',
      error: 'Internal Server Error',
      code: 500,
    });
  }
}
