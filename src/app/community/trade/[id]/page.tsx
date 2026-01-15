'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import BookmarkIcon from '@/components/detail/BookmarkIcon';
import DetailImgSection from '@/components/detail/DetailImgSection';
import tradeDetailData from '@/mocks/community/tradeDetail.json';
import { useState } from 'react';

export default function TradeArticleDetailPage() {
  const [isScrapped, setIsScrapped] = useState(false);

  const handleToggleScrap = () => {
    setIsScrapped((prev) => !prev);
  };
  const imageBar = tradeDetailData.imageUrls.length;
  return (
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 left-1/2 -translate-x-1/2 pb-20">
      <ArticleHeader title="거래/양도" />
      <section className="flex overflow-x-auto mb-3">
        {tradeDetailData.imageUrls.map((url, index) => (
          <DetailImgSection key={index} imageSrc={url} alt={tradeDetailData.marketTitle} />
        ))}
      </section>
      <section className="px-5">
        <p className="bg-gray-900 border border-gray-850 rounded-sm px-[10px] px-2 py-3 mb-7">
          채팅 링크
        </p>
        <p className="flex justify-between items-center gap-6 mb-1">
          <span className="font-semibold text-xl">{tradeDetailData.marketTitle}</span>
          <BookmarkIcon
            isActive={isScrapped}
            onClick={handleToggleScrap}
            className={`cursor-pointer w-6 h-6 transition-colors
            ${isScrapped ? 'text-white scale-110' : 'text-gray-600'}
          `}
          />
          <span className="text-gray-300 font-normal text-sm">{tradeDetailData.scrapCount}</span>
        </p>
        <span className="text-white font-medium text-xl mb-1">{tradeDetailData.price}원</span>
        <p className="flex gap-[7px]">
          <span className="text-gray-600 font-medium text-xs">
            {tradeDetailData.member.nickname}
          </span>
          <span className="text-gray-600 font-medium text-xs">{tradeDetailData.createdAt}</span>
        </p>
        <p className="text-gray-300 font-normal text-sm">{tradeDetailData.marketContent}</p>
      </section>
    </div>
  );
}
