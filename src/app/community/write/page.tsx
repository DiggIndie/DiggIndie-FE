'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@mui/material';

import CommunityWriteHeader from '@/components/community/CommunityWriteHeader';
import ImageUploadSection from '@/components/community/ImageUploadSection';
import TextArea from '@/components/community/TextArea';
import TradingLinkArea from '@/components/community/TradingLinkArea';
import TradingPriceArea from '@/components/community/TradingPriceArea';

import { postFree } from '@/api/freeBoard';
import { postMarket } from '@/api/marketBoard';

type UiGeneralTag = '없음' | '정보' | '공연 후기' | '추천' | '신보' | '음악 뉴스' | '동행';
type UiTradeTag = '판매' | '구매';

function mapFreeCategory(tag: UiGeneralTag) {
  switch (tag) {
    case '정보':
      return 'info';
    case '공연 후기':
      return 'review';
    case '추천':
      return 'recommend';
    case '신보':
      return 'release';
    case '음악 뉴스':
      return 'news';
    case '동행':
      return 'companion';
    default:
      return 'none';
  }
}

export default function Write() {
  const generalTag: UiGeneralTag[] = ['없음', '정보', '공연 후기', '추천', '신보', '음악 뉴스', '동행'];
  const tradeTag: UiTradeTag[] = ['판매', '구매'];

  const [boardType, setBoardType] = useState<'general' | 'trade'>('general');
  const [selectedTag, setSelectedTag] = useState<UiGeneralTag | UiTradeTag>('없음');
  const tags = boardType === 'general' ? generalTag : tradeTag;

  const [annonymous, setAnonymous] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // trade 전용
  const [price, setPrice] = useState<number | null>(null);
  const [chatUrl, setChatUrl] = useState('');

  // 이미지 업로드를 아직 URL로 안 올리니까 일단 빈 배열 유지
  const imageUrls: string[] = [];

  const isFormValidBase = title.trim().length > 0 && content.trim().length > 0;

  const isFormValid =
    boardType === 'general'
      ? isFormValidBase && String(selectedTag).length > 0
      : isFormValidBase &&
      (selectedTag === '판매' || selectedTag === '구매') &&
      price !== null &&
      price >= 0 &&
      chatUrl.trim().length > 0;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBoardTypeChange = (type: 'general' | 'trade') => {
    setBoardType(type);
    setSelectedTag(type === 'general' ? '없음' : '판매');

  };

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (boardType === 'general') {
        const res = await postFree({
          title,
          content,
          isAnonymous: annonymous,
          category: mapFreeCategory(selectedTag as UiGeneralTag),
          imageUrls,
        });

        if (res.isSuccess) {
          router.push(`/community/free/${res.payload.boardId}`);
        } else {
          alert(res.message || '게시글 작성에 실패했습니다.');
        }
        return;
      }

      // 거래양도
      const res = await postMarket({
        title,
        content,
        price: price ?? 0,
        chatUrl,
        type: selectedTag as UiTradeTag,
        imageUrls,
      });

      if (res.isSuccess) {
        router.push(`/community/trade/${res.payload.marketId}`);
      } else {
        alert(res.message || '게시글 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('게시글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-16">
      <CommunityWriteHeader disabled={!isFormValid || isSubmitting} onRightButtonClick={handleSubmit} />

      <div className="flex justify-between mb-3 px-5">
        <span className="font-medium text-base text-white">게시판 선택</span>
        <p className="flex gap-2" onClick={() => setAnonymous(!annonymous)}>
          <Checkbox
            checked={annonymous}
            sx={{
              width: 20,
              height: 20,
              padding: 0,
              borderRadius: '4px',
              border: '1px solid #374151',
              backgroundColor: 'transparent',
              '& .MuiSvgIcon-root': { display: 'none' },
              '&.Mui-checked': {
                backgroundColor: '#ef4444',
                borderColor: '#dc2626',
              },
              '&.Mui-checked::after': {
                content: '"✔"',
                color: '#fff',
                fontSize: 12,
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
          <span className={`text-sm font-medium ${annonymous ? 'text-main-red-2' : 'text-gray-500'}`}>익명</span>
        </p>
      </div>

      <div className="flex gap-2 pb-3 px-5">
        <span
          onClick={() => handleBoardTypeChange('general')}
          className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
            ${boardType === 'general' ? 'border-main-red-1 bg-main-red-4 text-white' : 'border-gray-600 text-gray-600'}`}
        >
          일반
        </span>
        <span
          onClick={() => handleBoardTypeChange('trade')}
          className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
            ${boardType === 'trade' ? 'border-main-red-1 bg-main-red-4 text-white' : 'border-gray-600 text-gray-600'}`}
        >
          거래/양도
        </span>
      </div>

      <div className="flex justify-between mb-3 px-5">
        <span className="font-medium text-base text-white">말머리 선택</span>
      </div>

      <div className="flex flex-wrap gap-2 pb-3 px-5">
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`border font-medium text-sm px-3 py-1 rounded-xs cursor-pointer
              ${selectedTag === tag ? 'border-main-red-1 bg-main-red-4 text-white' : 'border-gray-600 text-gray-600'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <ImageUploadSection required={boardType === 'trade'} />

      {boardType === 'trade' && (
        <>
          <TradingPriceArea value={price} onChange={setPrice} />
        </>
      )}

      <TextArea title={title} content={content} onChangeTitle={setTitle} onChangeContent={setContent} />

      {boardType === 'trade' && <TradingLinkArea value={chatUrl} onChange={setChatUrl} />}
    </div>
  );
}
