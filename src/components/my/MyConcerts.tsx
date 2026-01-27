'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import downBtn from '@/assets/icons/down.svg';
import { myConcertToConcertItem } from '@/services/concertMappers'

import MyConcertGrid from '@/components/my/ConcertGrid';
import { useMyConcerts } from '@/hooks/useMyConcerts';
import type { MyConcertItem, ConcertItem } from '@/types/concerts';

type SortKey = 'updated' | 'korean';

function parseDday(dday: string) {
  if (!dday) return Number.POSITIVE_INFINITY;
  const up = dday.toUpperCase().trim();
  if (up === 'D-DAY') return 0;

  const m = up.match(/^D-(\d+)$/);
  if (!m) return Number.POSITIVE_INFINITY;
  return Number(m[1]);
}


export default function MyConcerts() {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { concerts, isLoading, error, refetch } = useMyConcerts();


  // MyConcertItem 기준 정렬
  const sortedMyConcerts = useMemo<MyConcertItem[]>(() => {
    const list = [...(concerts ?? [])];

    // updated: 진행중 우선, D-day 가까운 순
    list.sort((a, b) => {
      if (a.finished !== b.finished) return a.finished ? 1 : -1;

      const da = parseDday(a.dday);
      const db = parseDday(b.dday);
      if (da !== db) return da - db;

      return (a.concertName ?? '').localeCompare(b.concertName ?? '', 'ko');
    });

    return list;
  }, [concerts]);

  //매핑 함수 이용하여 concertItem으로 매핑. 두 API 변수명이 조금씩 다름 (period -> duration 등)
  const sortedConcerts = useMemo<ConcertItem[]>(
    () => sortedMyConcerts.map(myConcertToConcertItem),
    [sortedMyConcerts]
  );

  return (
    <section className="w-full flex flex-col px-[20px] mt-[20px]">


      {/* 로딩/에러 */}
      {isLoading && (
        <div className="mt-[12px] text-[14px] text-[#8C8888]">불러오는 중...</div>
      )}

      {error && (
        <div className="mt-[12px] flex items-center gap-[8px]">
          <span className="text-[14px] text-[#8C8888]">{error}</span>
          <button
            type="button"
            onClick={refetch}
            className="text-[14px] text-white underline underline-offset-2"
          >
            다시 시도
          </button>
        </div>
      )}

      <div className={"flex mt-4 justify-center mt-5"}>
        <MyConcertGrid concerts={sortedConcerts} />
      </div>

    </section>
  );
}
