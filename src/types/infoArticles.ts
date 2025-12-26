import type { ArticleBase } from "@/types/articleBase";

export type InfoArticles = ArticleBase & {
  id: string;
  authorId: string;
};
