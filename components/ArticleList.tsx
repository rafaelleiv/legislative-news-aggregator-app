import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/actions/getArticles';
import { ArticlePagination } from '@/components/ArticlesPagination';

const ArticleList = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: number;
    pageSize?: number;
  };
}) => {
  const { page, pageSize, query } = searchParams;

  const { total, articles } = await getArticles({
    query: query,
    page,
    pageSize,
  });

  if (!articles || articles.length === 0) {
    return <p>No articles found</p>;
  }

  const totalPages = Math.ceil(total / pageSize!);

  return (
    <div className={'flex flex-col'}>
      <ul className={'mt-7 card_grid'}>
        {articles?.length > 0 &&
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </ul>
      <div className={'flex justify-center mt-5'}>
        <ArticlePagination currentPage={page!} totalPages={totalPages} />
      </div>
    </div>
  );
};
export default ArticleList;
