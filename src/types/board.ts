export interface BoardDetail {
  boardId: number;
  category: string;
  title: string;
  writerNickname: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
  views: number;
  likeCount: number;
  isLiked: true;
  commentCount: number;
  comments: Comment[];
}
export interface Comment {
  commentId: number;
  writerNickname: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: true;
  replies: Reply[];
}

export interface Reply {
  commentId: number;
  parentCommentId: number;
  writerNickname: string;
  replyToNickname: string;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: true;
  depth: number;
}
