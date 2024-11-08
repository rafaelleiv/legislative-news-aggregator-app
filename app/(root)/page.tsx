import React from 'react';
import FastSearchForm from '@/components/FastSearchForm';
import ArticleList from '@/components/ArticleList';
import validator from 'validator';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = (await searchParams) || {};

  // Sanitize the query, topic, and state
  const sanitizedQuery = validator.escape(query || '');

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

      <section className="section_container">
        <p className={'text-30-semibold'}>
          {sanitizedQuery
            ? 'Search results for: ' + sanitizedQuery
            : 'All news'}
        </p>

        <ArticleList
          searchParams={{
            query: sanitizedQuery,
          }}
        />
      </section>
    </>
  );
}
