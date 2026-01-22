export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

//게시글 작성 용
export type MarketPayload = {
  marketId: number;
}

export type MarketCategory =
  | "판매"
  | "구매";


export type PostMarketParams = {
  title: string,
  content: string,
  price: number,
  chatUrl: string,
  type: MarketCategory,
  imageUrls: string[]
}

