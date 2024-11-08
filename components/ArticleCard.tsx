import React from 'react';
import { Article } from '@/prisma/interfaces';
import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const {
    publishedAt,
    state,
    stateId,
    views,
    authorName,
    author,
    slug,
    title,
    summary,
    image,
    topics,
  } = article;

  return (
    <li className={'article-card group'}>
      <div className={'flex-between'}>
        <div className={'flex-col'}>
          <p className={'article_card_date'}>{formatDate(publishedAt)}</p>
          <Link
            href={{ pathname: '/', query: { state: state?.name } }}
            title={state?.name}
          >
            <span className={'text-12-light'}>
              {state?.name || stateId || 'NA'}
            </span>
          </Link>
        </div>
        <div className={'flex gap-1.5 items-center self-start'}>
          <EyeIcon className={'size-6 text-primary'} />
          <span className={'text-16-medium'}>{views}</span>
        </div>
      </div>
      <div className={'flex-between mt-5 gap-5'}>
        <div className={'flex-1'}>
          <p className={'text-20-semibold text-16-medium line-clamp-1'}>
            {authorName || author?.name}
          </p>
          <Link href={`/article/${slug}`}>
            <h3 className={'text-26-semibold line-clamp-1'}>{title}</h3>
          </Link>
          <Link href={`/article/${slug}`}>
            <p className={'article-card_desc'}>{summary}</p>
          </Link>
          <img src={image || ''} alt={title} className={'article-card_img'} />
          <div className={'flex-between mt-5'}>
            <div className={'flex items-center gap-0.5'}>
              {topics &&
                topics.length > 0 &&
                topics.map((topic, index) => (
                  <React.Fragment key={topic.id}>
                    <Link
                      href={{ pathname: '/', query: { topic: topic.name } }}
                    >
                      <span className={'text-14-normal-black'}>
                        {topic.name}
                      </span>
                    </Link>
                    {index < topics.length - 1 && (
                      <span className="mx-2 h-4 w-px bg-gray-300" />
                    )}
                  </React.Fragment>
                ))}
            </div>
            <Button className="article-card_btn" asChild>
              <Link href={`/news/${slug}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default ArticleCard;