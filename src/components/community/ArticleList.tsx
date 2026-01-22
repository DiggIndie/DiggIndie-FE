import Link from 'next/link';
import FreeArticleCard from './FreeArticleCard';
import TradeArticleCard from './TradeArticleCard';
import type { Article } from '@/types/mocks/mockArticles';
import type { FreeArticle } from '@/types/freeBoard';

type Props =
  | {
  articles: FreeArticle[];
  basePath: string;
  variant: 'free';
}
  | {
  articles: Article[];
  basePath: string;
  variant: 'trade';
};

export default function ArticleList(props: Props) {
  const { basePath, variant } = props;

  return (
    <div className="flex flex-col">
      {props.articles.map((article) => (
        <Link
          key={article.boardId}
          href={`${basePath}/${article.boardId}`}
          className="block"
        >
          {variant === 'trade' ? (
            <TradeArticleCard article={article as Article} />
          ) : (
            <FreeArticleCard article={article as FreeArticle} />
          )}
        </Link>
      ))}
    </div>
  );
}
