import React from 'react';
import ArticleForm from '@/components/ArticleForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getTopics } from '@/services/getTopics';
import { getStates } from '@/services/getStates';

const CreateArticle = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  // Execute both promises concurrently
  const [topics, states] = await Promise.all([getTopics(), getStates()]);

  return (
    <>
      <section className={'pink_container !min-h-[230px]'}>
        <h1 className={'heading'}>Submit your article</h1>
      </section>

      <ArticleForm topics={topics || []} states={states || []} />
    </>
  );
};

export default CreateArticle;
