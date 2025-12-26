// ArticleList.tsx
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import type { ArticleBase } from "@/types/articleBase";

type ArticleWithId = ArticleBase & {
  id: string;
};

type Props = {
  articles: ArticleWithId[];
  basePath: string; // "/community/free" | "/community/info"
};

export default function ArticleList({ articles, basePath }: Props) {
  return (
    <div className="flex flex-col">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`${basePath}/${article.id}`}
          className="block"
        >
          <ArticleCard article={article} />
        </Link>
      ))}
    </div>
  );
}
