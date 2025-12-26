import type { FreeArticles } from "@/types/freeArticles";
import FreeArticleCard from "@/components/community/FreeArticleCard";

type Props = {
  articles: FreeArticles[];
};

export default function FreeArticleList({ articles }: Props) {
  return (
    <div className="flex flex-col mt-[16px] ">
      {articles.slice(0, 7).map((article) => (
        <FreeArticleCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
}
