'use client';

import { useState } from 'react';

import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityTab from '@/components/community/CommunityTab';
import ArticleList from '@/components/community/ArticleList';
import CommunityHeaderFilter from '@/components/community/CommunityHeaderFilter';
import SideTab from '@/components/sideTabDir/SideTab';

import { useMarketList } from '@/hooks/useMarketList';
import type { MarketCategory } from '@/types/marketBoard';

const headerOptions = ['전체', '판매', '구매'] as const;
type UiHeader = (typeof headerOptions)[number];

const headerToType: Record<UiHeader, MarketCategory> = {
  전체: '전체',
  판매: '판매',
  구매: '구매',
};

export default function CommunityTradePage() {
  const [header, setHeader] = useState<UiHeader>('구매');
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  const { markets, isLoading, error, setCategory } = useMarketList({
    type: headerToType[header],
    query: '',
    page: 0,
    size: 20,
  });

  const handleHeaderChange = (next: UiHeader) => {
    setHeader(next);
    setCategory(headerToType[next]);
  };

  return (
    <div className="text-white flex flex-col h-screen bg-black relative overflow-hidden">
      <header className="sticky top-0 z-50 h-[52px] bg-black flex items-center shrink-0">
        <CommunityHeader title={'중고 거래'} onHamburgerClick={() => setIsSideTabOpen(true)} />
      </header>

      <div className="shrink-0">
        <CommunityTab />
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto scrollbar flex flex-col bg-black">
        <CommunityHeaderFilter
          headers={headerOptions}
          value={header}
          onChangeAction={handleHeaderChange}
        />

        {isLoading && <div className="px-5 py-4 text-gray-500">로딩중...</div>}
        {!isLoading && error && <div className="px-5 py-4 text-gray-500">{error}</div>}

        {!isLoading && !error && (
          <ArticleList articles={markets} basePath="/community/trade" variant="trade" />
        )}
      </main>

      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
