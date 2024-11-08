import prisma from '@/lib/prisma';

export async function getArticles(searchParams: {
  query?: string;
  state?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    searchParams.page = searchParams?.page || 1;
    searchParams.pageSize = searchParams?.pageSize || 10;

    const articles = await prisma.article.findMany({
      where: {
        slug: searchParams.query
          ? { contains: searchParams.query.toLowerCase() }
          : undefined,
        states: searchParams.state
          ? { some: { name: searchParams.state } }
          : undefined,
        topics: searchParams.topic
          ? { some: { name: searchParams.topic } }
          : undefined,
      },
      include: {
        states: true,
        topics: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip: (searchParams.page - 1) * searchParams.pageSize,
      take: searchParams.pageSize,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    if (!articles) {
      throw new Error('No articles found');
    }

    return articles;
  } catch (err) {
    console.error(err, 'Error fetching articles');

    return [];
  }
}
