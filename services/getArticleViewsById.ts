import prisma from '@/lib/prisma';

export async function getArticleViewsById(id: number) {
  try {
    const { views = 0 } =
      (await prisma.article.findUnique({
        where: { id },
        select: {
          views: true,
        },
      })) || {};

    return views;
  } catch (err) {
    console.error(err, `Error fetching views for article: ${id}`);

    return 0;
  }
}
