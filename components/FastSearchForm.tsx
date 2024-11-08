import React from 'react';
import Form from 'next/form';
import FastSearchFormReset from '@/components/FastSearchFormReset';
import { Search } from 'lucide-react';

const FastSearchForm = ({ query }: { query: string }) => {
  return (
    <Form action="/" scroll={false} className={'search-form'}>
      <input
        type="text"
        defaultValue={query}
        name="query"
        placeholder="Search for news..."
        className={'search-input'}
      />
      <div className={'flex gap-2'}>
        {query && <FastSearchFormReset />}
        <button type="submit" className={'search-btn'}>
          <Search className={'size-4 text-white'} />
        </button>
      </div>
    </Form>
  );
};
export default FastSearchForm;
