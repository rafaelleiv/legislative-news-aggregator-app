import React, { Suspense } from 'react';
import { auth } from '@/auth';
import { getUser } from '@/actions/getUser';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { getTopics } from '@/services/getTopics';
import { getStates } from '@/services/getStates';
import TopicsSelector from '@/components/TopicsSelector';
import StatesSelector from '@/components/StatesSelector';

export const experimental_ppr = true;

const Page = async () => {
  const session = await auth();

  if (!session || !session.id) {
    console.error('Unauthorized');
    redirect('/');
  }

  const currentUser = await getUser(session.id);

  if (!currentUser) {
    return notFound();
  }

  // Execute both promises concurrently
  const [topics, states] = await Promise.all([getTopics(), getStates()]);
  const savedTopics = currentUser.preferences?.savedTopics?.map((topic) =>
    topic.id.toString()
  );
  const savedStates = currentUser.preferences?.savedStates?.map((state) =>
    state.id.toString()
  );

  return (
    <section>
      <div className={'profile_container'}>
        <div className={'profile_card'}>
          <div className={'profile_title'}>
            <h3 className={'text-24-black uppercase text-center line-clamp-1'}>
              {currentUser.name}
            </h3>
          </div>

          <Image
            src={currentUser.image || ''}
            alt={currentUser.name || ''}
            width={220}
            height={220}
            className={'profile_image'}
          />

          <p className={'text-30-extrabold mt-7 text-center'}>
            {currentUser.email}
          </p>
        </div>

        <div className={'flex flex-col'}>
          <Suspense fallback={<div>Loading...</div>}>
            <TopicsSelector
              topics={topics}
              savedTopicsIds={savedTopics || []}
              userId={session.id}
            />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <StatesSelector
              states={states}
              savedStatesIds={savedStates || []}
              userId={session.id}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};
export default Page;
