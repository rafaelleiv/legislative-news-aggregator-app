import React from 'react';
import Ping from '@/components/Ping';
import { getArticleViewsById } from '@/services/getArticleViewsById';
import { unstable_after as after } from 'next/server';
import { patchArticleViews } from '@/services/patchArticleViews';

const Views = async ({ id }: { id: string }) => {
  const views = await getArticleViewsById(parseInt(id));

  after(async () => {
    await patchArticleViews(parseInt(id));
  });

  return (
    <div className={'view-container'}>
      <div className={'absolute -top-2 -right-2'}>
        <Ping />
      </div>

      <p className={'view-text'}>
        Views: {typeof views === 'number' ? views : ''}
      </p>
    </div>
  );
};
export default Views;
