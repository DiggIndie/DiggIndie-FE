'use client';

import { postRecSatisfaction } from '@/api/artists';

type Reason =
  | 'ALREADY_KNOWN'
  | 'NOT_MY_TASTE'
  | 'KEYWORD_MISMATCH'
  | 'GENRE_FINE_TRACK_NOT_MY_TASTE'
  | 'BORED'
  | 'OTHER';

export default function RecSatisfaction() {
  const handleClick = async (reason: Reason) => {
    try {
      await postRecSatisfaction({
        isSatisfied: false,
        reason,
      });
    } catch (err) {
      console.error(err);
      alert('만족도 전달에 실패했습니다.');
    }
  };

  return (
    <div
      className="w-[235px] h-[190px] flex flex-col justify-between p-2 bg-black font-normal
      text-[14px] text-white border-[1px] border-[#413D3D] rounded-[4px]"
    >
      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('ALREADY_KNOWN')}
      >
        <span>이미 알고 있는 아티스트예요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('NOT_MY_TASTE')}
      >
        <span>취향과 상관 없는 음악 같아요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('KEYWORD_MISMATCH')}
      >
        <span>키워드와 실제 음악이 매칭되지 않아요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('GENRE_FINE_TRACK_NOT_MY_TASTE')}
      >
        <span>장르는 맞지만 노래가 취향이 아니예요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('BORED')}
      >
        <span>비슷한 스타일만 나와 지루해요</span>
      </button>

      <button
        className="flex w-full pl-2 py-1 cursor-pointer"
        onClick={() => handleClick('OTHER')}
      >
        <span>기타</span>
      </button>
    </div>
  );
}
