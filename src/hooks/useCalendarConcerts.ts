"use client";

import { useEffect, useRef, useState } from "react";
import { getConcertsByDates } from "@/api/concerts";
import type { ConcertItem, PageInfo } from "@/types/concerts";

type Params = {
  dates: string[];
  page?: number;
  size?: number;
  enabled?: boolean;
};

export function useCalendarConcerts({ dates, page = 0, size = 20, enabled = true }: Params) {
  const [concerts, setConcerts] = useState<ConcertItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //요청 중복 방지
  const reqIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    // 날짜 없으면 초기화
    if (!dates || dates.length === 0) {
      setConcerts([]);
      setPageInfo(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const reqId = ++reqIdRef.current;
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getConcertsByDates({ dates, page, size });

        // 최신 요청만 반영
        if (cancelled || reqId !== reqIdRef.current) return;

        if (!res?.isSuccess || !res.payload) {
          throw new Error(res?.message ?? "공연 조회 실패");
        }

        setConcerts(res.payload.concerts ?? []);
        setPageInfo(res.payload.pageInfo ?? null);
      } catch (e) {
        if (cancelled || reqId !== reqIdRef.current) return;
        setConcerts([]);
        setPageInfo(null);
        setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
      } finally {
        if (cancelled || reqId !== reqIdRef.current) return;
        setIsLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [enabled, page, size, dates.join("|")]); // dates 배열 의존성 안정화

  const refetch = async () => {
    const reqId = ++reqIdRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const res = await getConcertsByDates({ dates, page, size });
      if (reqId !== reqIdRef.current) return;

      if (!res?.isSuccess || !res.payload) {
        throw new Error(res?.message ?? "공연 조회 실패");
      }

      setConcerts(res.payload.concerts ?? []);
      setPageInfo(res.payload.pageInfo ?? null);
    } catch (e) {
      if (reqId !== reqIdRef.current) return;
      setConcerts([]);
      setPageInfo(null);
      setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
    } finally {
      if (reqId !== reqIdRef.current) return;
      setIsLoading(false);
    }
  };

  return { concerts, pageInfo, isLoading, error, refetch };
}
