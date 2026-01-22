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

//게시글 리스트, 검색
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

//게시글 삭제
export type DeleteFreeParams = { boardId: number };
export type DeleteFreePayload = unknown;

export async function deleteFree({ boardId }: DeleteFreeParams) {
  return fetchClient<DeleteFreePayload>(`/boards/${boardId}`, {
    method: 'DELETE',
    auth: true,
  });
}
