import prisma from '@/lib/prisma';

export async function patchArticleViews(articleId: number) {
  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (err) {
    console.error(err, 'Error updating article views');

    return null;
  }
}
