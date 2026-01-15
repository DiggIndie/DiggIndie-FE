'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import downBtn from '@/assets/icons/down.svg';
import MyConcertGrid from '@/components/my/MyConcertGrid';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';

import searchBtn from '@/assets/icons/artistSearch.svg';
import searchBack from '@/assets/icons/searchBack.svg';
import searchGrayBtn from '@/assets/icons/searchGray.svg';

import type { ConcertListItem } from '@/types/mocks/mockConcerts';
import concertData from '@/mocks/concertDummy.json';

type SortKey = 'updated' | 'korean' | 'scrap';

export default function SearchConcert() {
  const [query, setQuery] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [sortKey, setSortKey] = useState<SortKey>('updated');
  const [concerts, setConcerts] = useState<ConcertListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* 최초 1회 로드 */
  useEffect(() => {
    setIsLoading(true);
    setConcerts(concertData.concerts);
    setIsLoading(false);
  }, []);

  /* 바깥 클릭 시 드롭다운 닫기 */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  /* debounce */
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDebouncedTerm(query);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const label =
    sortKey === 'updated' ? '업데이트순' : sortKey === 'korean' ? '가나다순' : '스크랩순';

  return (
    <section className="relative w-full flex flex-col px-[20px] mt-[20px]">
      {/* 검색 초기화 */}
      <Image
        src={searchBack}
        alt="back"
        className="absolute left-[20px] mt-[10px] cursor-pointer"
        onClick={() => {
          setQuery('');
          setIsLoading(true);
          setConcerts(concertData.concerts);
          setIsLoading(false);
        }}
      />

      {/* 검색 input */}
      <div
        className={`relative flex h-[44px] mb-[12px] px-3 py-2 rounded-[4px] bg-[#4A4747] text-white 
        ${query ? 'w-[307px] ml-[28px] mr-[12px]' : 'w-[335px]'}`}
      >
        <Image
          src={query ? searchGrayBtn : searchBtn}
          alt="Search"
          className="absolute right-[8px] mt-[2px]"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setDebouncedTerm(query);
              setIsLoading(false);
            }
          }}
          placeholder="검색어를 입력하세요"
          className="placeholder:text-[#A6A6A6] font-regular outline- none bg-transparent w-full"
        />
      </div>

      {/* 드롭다운 */}
      <div className="relative w-fit" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="w-[100px] h-[28px] border border-[#736F6F] rounded-[4px] flex items-center gap-[4px]"
        >
          <span className="ml-[10.5px] text-[14px] tracking-[-0.42px] font-medium text-white">
            {label}
          </span>
          <Image src={downBtn} alt="open dropdown" />
        </button>

        {isOpen && (
          <div className="absolute left-0 mt-[8px] w-[100px] h-[108px] rounded-[4px]
                       border border-[#736F6F] flex flex-col items-center
                       py-[8px] gap-[4px] bg-black shadow-lg z-50">
            {(['updated', 'korean', 'scrap'] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSortKey(key);
                  setIsOpen(false);
                }}
                className={`w-full h-[28px] text-[14px] ${
                  sortKey === key ? 'bg-[#332F2F] text-white' : 'text-[#8C8888]'
                }`}
              >
                {key === 'updated' ? '업데이트순' : key === 'korean' ? '가나다순' : '스크랩순'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 결과 */}
      {isLoading ? <SearchCardSkeleton /> : <MyConcertGrid concerts={concerts} />}
    </section>
  );
}
