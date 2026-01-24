'use client';
import Image from 'next/image';
import commentsIcon from '@/assets/sideTab/Chat 2.svg';
import HeartIcon from '@/assets/community/HeartIcon';
import { useState } from 'react';
import { FreeBoardDetail } from '@/types/board';

interface ArticleBodyProps {
  content: FreeBoardDetail;
}
export default function ArticleBody({ content }: ArticleBodyProps) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-col w-full py-4 px-5 border-b-4 border-gray-850">
      <span className="font-semibold text-xl text-white mb-1 break-words line-clamp-2">
        {content?.category && `[${content.category}] `}
        {content?.title}
      </span>
      <p className="flex gap-2 mb-2">
        <span className="text-gray-600 font-medium text-xs ">{content?.writerNickname}</span>
        <span className="text-gray-600 font-medium text-xs">{content?.createdAt}</span>
        <span className="text-gray-600 font-medium text-xs">조회수 {content?.views}</span>
      </p>
      <div className="text-sm text-gray-300 font-normal mb-5 min-h-12 break-words whitespace-pre-wrap">
        {content?.content}
      </div>
      {content?.imageUrls?.length === 1 && (
        <div className="w-full aspect-square relative mb-3">
          <Image
            src={content.imageUrls[0]}
            alt="article-image"
            fill
            className="object-cover rounded-sm"
          />
        </div>
      )}
      {/*이미지 row*/}
      {content?.imageUrls && content.imageUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-scroll mb-3">
          {content?.imageUrls.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="w-[200px] h-[200px] flex-shrink-0 relative overflow-hidden"
            >
              <Image src={src} alt={`article-image-${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* 좋아요, 댓글 수 */}
      <div className="flex gap-1 text-sm font-normal gap-1">
        <p className="flex gap-[3px] justify-center items-center">
          <HeartIcon size={24} active={isLiked} onClick={() => setIsLiked(!isLiked)} />
          <span className="font-normal text-sm text-white">{content?.likeCount}</span>
        </p>
        <p className="flex gap-[3px] justify-center items-center">
          <Image src={commentsIcon} alt="comment" width={24} height={24} />
          <span className="font-normal text-sm text-white">{content?.commentCount}</span>
        </p>
      </div>
    </div>
  );
}
