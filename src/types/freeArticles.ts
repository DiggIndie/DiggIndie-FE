import type { ArticleBase } from "@/types/articleBase";

export type FreeArticles = ArticleBase & {
  authorId: string;
};
