"use client";

import type { FreeArticles } from "@/types/freeArticles";
import ArticleCard from "@/components/community/ArticleCard";

type Props = {
  articles: FreeArticles[];
};

export default function ArticleList({ articles }: Props) {
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="flex flex-col mt-[16px]">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
