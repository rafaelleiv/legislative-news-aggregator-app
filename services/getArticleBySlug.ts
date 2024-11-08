import prisma from '@/lib/prisma';
import { Article } from '@/prisma/interfaces';

export const getArticleBySlug = async (
  slug: string
): Promise<Article | null> => {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        states: true,
        topics: true,
      },
    });

    if (!article) {
      throw new Error('Article not found');
    }

    return article;
  } catch (err) {
    console.error(err, 'Error fetching article');

    return null;
  }
};
