import React from 'react';
import FastSearchForm from '@/components/FastSearchForm';
import ArticleList from '@/components/ArticleList';
import validator from 'validator';
import IncomingArticles from '@/components/IncomingArticles';

const PAGINATION_SIZE = process.env.NEXT_PUBLIC_PAGINATION_LIMIT;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page: string; pageSize: string }>;
}) {
  const { query, page, pageSize } = (await searchParams) || {};

  // Sanitize the query, topic, and state
  const sanitizedQuery = validator.escape(query || '');
  const sanitizedPage =
    page && validator.isInt(page || '') ? parseInt(page, 10) : 1;
  const sanitizedPageSize =
    pageSize && validator.isInt(pageSize)
      ? parseInt(pageSize, 10)
      : +(PAGINATION_SIZE || 10);

  return (
    <>
      <section className="pink_container">
        <h1 className={'heading'}>
          Fallow the <span className={'highlight'}>legislative news</span> road{' '}
        </h1>

        <p className={'sub-heading !max-w-2xl'}>
          We provide you with the latest news on the legislative process in USA
          <br /> Stay informed with us.
        </p>

        <FastSearchForm query={sanitizedQuery} />
      </section>

      <IncomingArticles />

      <section className="section_container">
        <p className={'text-30-semibold'}>
          {sanitizedQuery
            ? 'Search results for: ' + sanitizedQuery
            : 'All news'}
        </p>

        <ArticleList
          searchParams={{
            query: sanitizedQuery,
            page: sanitizedPage,
            pageSize: sanitizedPageSize,
          }}
        />
      </section>
    </>
  );
}
