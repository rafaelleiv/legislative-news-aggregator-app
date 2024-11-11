import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/actions/getArticles';

const ArticleList = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: number;
    pageSize?: number;
  };
}) => {
  const articles = await getArticles(searchParams);

  if (!articles || articles.length === 0) {
    return <p>No articles found</p>;
  }

  return (
    <ul className={'mt-7 card_grid'}>
      {articles?.length > 0 &&
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
    </ul>
  );
};
export default ArticleList;
