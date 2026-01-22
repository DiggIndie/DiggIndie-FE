import { fetchClient } from "@/api/client";

import {
  FreePayload, GetFreeListParams, PostFreeParams, FreeListPayload
}
  from '@/types/freeBoard';


export async function postFree(params: PostFreeParams) {
  return fetchClient<FreePayload>("/boards", {
    method: "POST",
    auth: true,
    body: JSON.stringify(params),
  });
}

export async function getFreeList(params: GetFreeListParams) {
  const { category = 'none', query = '', page = 0, size = 20 } = params;

  const qs = new URLSearchParams();
  qs.set('category', category);
  if (query.trim()) qs.set('query', query.trim());
  qs.set('page', String(page));
  qs.set('size', String(size));

  return fetchClient<FreeListPayload>(`/boards?${qs.toString()}`, {
    method: 'GET',
    auth: false,
  });
}