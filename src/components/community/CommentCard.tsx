'use client';
import HeartIcon from '@/assets/community/HeartIcon';
import { Comment } from '@/types/board';
import { useState } from 'react';
import reply_arrow from '@/assets/community/Arrow Bottom Left 3.svg';
import Image from 'next/image';
export default function CommentCard({ comments }: { comments: Comment[] }) {
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  if (!comments || comments.length === 0) {
    return <div className="py-10 text-center text-gray-600 text-sm">댓글이 없습니다.</div>;
  }
  return (
    <div className="w-full mt-2">
      {comments?.map((comment) => (
        <div key={comment.commentId} className="border-b border-gray-900">
          <div className="px-5 py-4">
            <p className="flex gap-[9px] mb-2">
              <span className="text-base font-medium">{comment.writerNickname}</span>
              <span className="text-gray-600 text-sm self-end">12분전</span>
            </p>

            <div className="text-sm text-gray-300 font-normal">{comment.content}</div>
            <div className="flex items-center mt-2">
              <span className="text-gray-600 text-sm font-medium pr-3 border-r-1 border-gray-800 cursor-pointer">
                답글 달기
              </span>
              <p className="flex gap-[3px] pl-3 items-center">
                <HeartIcon
                  size={16}
                  active={likedMap[comment.commentId] ?? comment.isLiked}
                  onClick={() => toggleLike(comment.commentId)}
                  firstStroke="#736F6F"
                />
                <span className="text-sm text-gray-600 font-normal">{comment.likeCount}</span>
              </p>
            </div>
          </div>
          {comment.replies.map((reply) => (
            <section key={reply.commentId} className="border-b border-gray-900">
              <div className="flex gap-2 items-start py-4 px-5 border-b border-gray-900">
                <Image src={reply_arrow} alt="reply arrow" />
                <div className="flex flex-col">
                  <p className="flex gap-2 items-end">
                    <span className="text-base font-medium text-white">
                      {reply.writerNickname}{' '}
                    </span>
                    <span className="text-xs font-medium text-gray-600">{reply.createdAt} </span>
                  </p>
                  <p className="text-gray-300 font-normal text-sm">{reply.content}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600 text-sm font-medium pr-3 border-r-1 border-gray-800 cursor-pointer">
                      답글 달기
                    </span>
                    <p className="flex gap-[3px] pl-3 items-center">
                      <HeartIcon
                        size={16}
                        active={likedMap[reply.commentId] ?? reply.isLiked}
                        onClick={() => toggleLike(reply.commentId)}
                        firstStroke="#736F6F"
                      />
                      <span className="text-sm text-gray-600 font-normal">{comment.likeCount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      ))}
    </div>
  );
}
