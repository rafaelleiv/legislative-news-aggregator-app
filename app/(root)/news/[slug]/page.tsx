import React, { Suspense } from 'react';
import { getArticleBySlug } from '@/actions/getArticleBySlug';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import CardInfoContent from '@/components/CardInfoContent';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Views from '@/components/Views';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const experimental_ppr = true;

const ArticleDetails = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);
  console.log(article);
  if (!article) {
    return notFound();
  }

  return (
    <>
      <section className={'pink_container !min-h-[180px]'}>
        <p className={'tag'}>{formatDate(article.publishedAt)}</p>

        <h1 className={'heading'}>{article.title}</h1>
        <p className={'sub-heading !max-w-5xl'}>{article.summary}</p>
      </section>

      <section className={'section_container'}>
        <div className={'flex flex-col md:flex-row'}>
          <div className={'flex-1 flex-col'}>
            <div className={'flex flex-col'}>
              <div className={'relative w-full h-52 md:h-80'}>
                <Image
                  src={article.image || ''}
                  alt={article.title}
                  className={'rounded-md object-cover'}
                  fill={true}
                />
              </div>
              {article.link && (
                <div className={'mt-5 flex justify-center'}>
                  <Link
                    href={article.link}
                    target={'_blank'}
                    className={
                      'flex flex-1 justify-center items-center gap-3 text-center text-white bg-primary py-3 px-4 rounded-md'
                    }
                  >
                    Read more
                    <ExternalLink />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={'flex-1 flex-col flex gap-3 mt-5 md:mt-0 md:ml-5'}>
            <CardInfoContent heading={'Topics'}>
              <>
                {article.topics ? (
                  <div className={'flex gap-3'}>
                    {article.topics.map((topic) => (
                      <span key={topic.id} className={'topic-tag'}>
                        {topic.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>No topics</span>
                )}
              </>
            </CardInfoContent>

            <CardInfoContent heading={'State'}>
              <>
                {article.states ? (
                  <div className={'flex gap-3'}>
                    {article.states.map((state) => (
                      <span key={state.id} className={'topic-tag'}>
                        {state.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span>No topics</span>
                )}
              </>
            </CardInfoContent>

            <CardInfoContent heading={'Author'}>
              <span>
                {article.authorName || article.author?.name || 'Anonymous'}
              </span>
            </CardInfoContent>

            <Suspense fallback={<Skeleton className={'view_skeleton'} />}>
              <Views id={article?.id.toString()} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};
export default ArticleDetails;
