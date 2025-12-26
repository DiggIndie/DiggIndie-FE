import type { ArticleComment } from "@/types/articleComment";

export const mockComments: ArticleComment[] = [
  {
    id: "comment-1",
    authorId: "user-1",
    content: "댓글 댓글 댓글 댓글 댓글 댓글 댓글",
    likes: 5,
    written: 11
  },
  {
    id: "comment-2",
    authorId: "user-2",
    content: "댓글 댓글 댓글 댓글 댓글 댓글 댓글",
    likes: 9,
    written: 6
  },
  {
    id: "comment-3",
    authorId: "user-2",
    content: "댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
    likes: 1,
    written: 9
  },
  {
    id: "comment-4",
    authorId: "user-1",
    content: "댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글 댓글",
    likes: 9,
    written: 6
  },
];
