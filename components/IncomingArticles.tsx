'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/prisma/interfaces';
import ArticleCard from '@/components/ArticleCard';
import { useWebSocketContext } from '@/app/context/WebSocketContext';

const IncomingArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { messages } = useWebSocketContext();

  useEffect(() => {
    if (messages.length > 0) {
      const newArticles = messages
        .filter((message) => message.topic.toLowerCase() === 'general')
        .flatMap((message) => message.data)
        .filter(
          (newArticle) =>
            !articles.some((article) => article.id === newArticle.id)
        ); // Filter out duplicates

      setArticles((prevArticles) => [...newArticles, ...prevArticles]);
    }
  }, [messages]);

  return (
    <>
      {articles && articles.length > 0 && (
        <>
          <section className="section_container !pb-0">
            <p className={'text-30-semibold'}>Incoming Articles</p>

            <div className={'flex flex-col'}>
              <ul className={'mt-7 card_grid'}>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default IncomingArticles;
