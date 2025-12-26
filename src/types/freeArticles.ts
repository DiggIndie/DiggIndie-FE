import type { ArticleBase } from "@/types/articleBase";

export type FreeArticles = ArticleBase & {
  id: string;
  authorId: string;
};
