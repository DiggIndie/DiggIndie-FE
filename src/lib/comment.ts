//댓글을 게시글에 매핑하는 함수
import type { ArticleComment } from "@/types/articleComment";

export function mapCommentsByIds(
  commentIds: string[],
  comments: ArticleComment[]
): ArticleComment[] {
  const commentsById = new Map(comments.map((c) => [c.id, c]));
  return commentIds
    .map((id) => commentsById.get(id))
    .filter(Boolean) as ArticleComment[];
}
