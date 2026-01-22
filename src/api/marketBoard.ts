import { fetchClient } from "@/api/client";

import type {
  GetMarketListParams, MarketListPayload, MarketPayload, PostMarketParams,
}
from '@/types/marketBoard';

export async function postMarket(params: PostMarketParams) {
  return fetchClient<MarketPayload>("/markets", {
    method: "POST",
    auth: true,
    body: JSON.stringify(params),
  });
}

//게시글 리스트
export async function getMarketList(params: GetMarketListParams) {
  const { type, query = '', page = 0, size = 20 } = params;

  const qs = new URLSearchParams();

  if (type && type !== '전체') {
    qs.set('type', type);
  }

  if (query.trim()) qs.set('query', query.trim());
  qs.set('page', String(page));
  qs.set('size', String(size));

  return fetchClient<MarketListPayload>(`/markets?${qs.toString()}`, {
    method: 'GET',
    auth: false,
  });
}