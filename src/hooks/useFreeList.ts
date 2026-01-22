'use client';

import { useCallback, useEffect, useState } from 'react';
import { getFreeList } from '@/api/freeBoard';
import type { FreeListPayload, FreeArticle, GetFreeListParams, FreeCategory } from '@/types/freeBoard';

type State = {
  articles: FreeArticle[];
  pageInfo: FreeListPayload['pageInfo'] | null;
  isLoading: boolean;
  error: string | null;
};

function mapFreeListToArticles(payload: FreeListPayload): FreeArticle[] {
  return payload.boards.map((b) => ({
    boardId: b.boardId,
    category: b.category,
    title: b.title,
    createdAt: b.createdAt,
    views: b.views,
    imageCount: b.imageCount
  }));
}

export function useFreeList(initial: GetFreeListParams) {
  const [params, setParams] = useState<GetFreeListParams>(initial);

  const [state, setState] = useState<State>({
    articles: [],
    pageInfo: null,
    isLoading: false,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const res = await getFreeList(params);

      if (!res.isSuccess) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: res.message || '목록을 불러오지 못했습니다.',
        }));
        return;
      }

      const payload = res.payload;
      setState({
        articles: mapFreeListToArticles(payload),
        pageInfo: payload.pageInfo,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: '목록을 불러오지 못했습니다.',
      }));
    }
  }, [params]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const setCategory = (category: FreeCategory) => {
    setParams((p) => ({ ...p, category, page: 0 }));
  };

  const setQuery = (query: string) => {
    setParams((p) => ({ ...p, query, page: 0 }));
  };

  const setPage = (page: number) => {
    setParams((p) => ({ ...p, page }));
  };

  return {
    params,
    ...state,
    refetch,
    setParams,
    setCategory,
    setQuery,
    setPage,
  };
}
