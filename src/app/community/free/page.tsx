'use client';

import { useMemo, useState, useEffect } from 'react';

import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityTab from '@/components/community/CommunityTab';
import ArticleList from '@/components/community/ArticleList';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';
import SideTab from '@/components/sideTabDir/SideTab';

import { useFreeList } from '@/hooks/useFreeList';
import type { FreeCategory } from '@/types/freeBoard';

const headerOptions = ['전체', '정보', '공연 후기', '추천', '신보', '음악 뉴스', '동행'] as const;
type UiHeader = (typeof headerOptions)[number];

const headerToCategory: Record<UiHeader, FreeCategory> = {
  전체: 'none',
  정보: 'info',
  '공연 후기': 'review',
  추천: 'recommend',
  신보: 'release',
  '음악 뉴스': 'news',
  동행: 'companion',
};

export default function CommunityFreePage() {
  const [header, setHeader] = useState<UiHeader>('전체');
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  const initialCategory = useMemo(() => headerToCategory[header], [header]);

  const { articles, isLoading, error, setCategory } = useFreeList({
    category: initialCategory,
    query: '',
    page: 0,
    size: 20,
  });

  useEffect(() => {
    setCategory(headerToCategory[header]);
  }, [header, setCategory]);

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <CommunityHeader title={'디깅 라운지'} onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>

      <div className="shrink-0">
        <CommunityTab />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <CommunityHeaderFilter headers={headerOptions} value={header} onChangeAction={setHeader} />

        {isLoading && <div className="px-5 py-4 text-gray-500">로딩중...</div>}
        {!isLoading && error && <div className="px-5 py-4 text-gray-500">{error}</div>}

        {!isLoading && !error && (
          <ArticleList articles={articles} basePath="/community/free" variant="free" />
        )}
      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
