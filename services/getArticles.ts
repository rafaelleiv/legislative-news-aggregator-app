import prisma from '@/lib/prisma';

export async function getArticles(searchParams: {
  query?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    searchParams.page = searchParams?.page || 1;
    searchParams.pageSize = searchParams?.pageSize || 10;
    const query = searchParams.query || '';

    const whereClause = {
      OR: [
        query ? { slug: { contains: query.toLowerCase() } } : null,
        query ? { states: { some: { name: query } } } : null,
        query ? { topics: { some: { name: query } } } : null,
        // searchParams.state
        //   ? { states: { some: { name: searchParams.state } } }
        //   : null,
        // searchParams.topic
        //   ? { topics: { some: { name: searchParams.topic } } }
        //   : null,
      ].filter((condition) => condition !== null),
    };

    const articles = await prisma.article.findMany({
      where: whereClause.OR.length > 0 ? whereClause : undefined, // solo aplica el filtro si OR tiene condiciones
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
