import { fetchClient } from "@/api/client";

import type {
  MarketPayload, PostMarketParams,
}
  from '@/types/marketBoard';


export async function postMarket(params: PostMarketParams) {
  return fetchClient<MarketPayload>("/markets", {
    method: "POST",
    auth: true,
    body: JSON.stringify(params),
  });
}