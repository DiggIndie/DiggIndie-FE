import { notFound } from "next/navigation";
import ArticleDetail from "@/components/community/articles/ArticleDetail";

import { mockFreeArticles } from "@/mocks/mockFreeArticles";
import { mockUsers } from "@/mocks/mockUsers";
import { mockComments } from "@/mocks/mockComments";

import type { ArticleComment } from "@/types/articleComment";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FreeArticleDetailPage({ params }: Props) {
  const { id } = await params;

  const article = mockFreeArticles.find((a) => a.id === id);
  if (!article) return notFound();

  const author = mockUsers.find((u) => u.id === article.authorId);
  if (!author) return notFound();

  const comments: ArticleComment[] = article.comments.flatMap((commentId) => {
    const c = mockComments.find((mc) => mc.id === commentId);
    return c ? [c] : [];
  });

  return (
    <ArticleDetail
      article={article}
      author={author}
      comments={comments}
      users={mockUsers}
    />
  );
}
