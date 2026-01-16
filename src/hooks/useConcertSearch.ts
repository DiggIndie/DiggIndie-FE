
"use client";

import { useEffect, useMemo, useState } from "react";
import { getConcerts, type GetConcertParams } from "@/api/concerts";
import type { ConcertItem, PageInfo } from "@/types/concerts";

type Options = {
  order: GetConcertParams["order"];
  query?: string;
  page?: number;
  size?: number;
  sort?: string[];
  enabled?: boolean;
};

export function useConcertsSearch(options: Options) {
  const { order, query = "", page = 0, size = 20, sort, enabled = true } = options;

  // query 비었을 떈 전체조회
  const q = useMemo(() => (query ?? "").trim(), [query]);
  const sortKey = useMemo(() => (sort?.length ? JSON.stringify(sort) : ""), [sort]);

  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let alive = true;

    (async () => {
      try {
        setError(null);

        const res = await getConcerts({
          order,
          query: q,
          page,
          size,
          sort,
        });

        if (!alive) return;

        setConcerts(res.payload.concerts ?? []);
        setPageInfo(res.payload.pageInfo ?? null);
      } catch (e) {
        if (!alive) return;
        setConcerts([]);
        setPageInfo(null);
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    })();

    return () => {
      alive = false;
    };
  }, [enabled, order, q, page, size, sortKey]);

  return { concerts, pageInfo, error };
}
