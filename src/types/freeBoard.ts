export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

//게시글 작성
export type FreePayload = {
  boardId: number;
}

export type FreeCategory =
  | "none"
  | "info"
  | "review"
  | "recommend"
  | "release"
  | "news"
  | "companion";


export type PostFreeParams = {
  title: string,
  content: string,
  isAnonymous: boolean,
  category: FreeCategory,
  imageUrls: string[]
}

//게시글 리스트
export type FreeArticle = {
  boardId: number;
  category: FreeCategory;
  title: string;
  createdAt: string;
  views: number;
  imageCount: number;
}

export type FreeListPayload = {
  boards: FreeArticle [];
  pageInfo: PageInfo;
}

export type GetFreeListParams = {
  category?: FreeCategory
  query?: string;
  page?: number;
  size?: number;
};