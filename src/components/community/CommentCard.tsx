'use client';

import { useState } from 'react';
import Image from 'next/image';
import HeartIcon from '@/assets/community/HeartIcon';
import reply_arrow from '@/assets/community/Arrow Bottom Left 3.svg';
import { Comment } from '@/types/board';

export default function CommentCard({ comments }: { comments: Comment[] }) {
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 댓글 없을 때
  if (!comments || comments.length === 0) {
    return <div className="py-10 text-center text-gray-600 text-sm">댓글이 없습니다.</div>;
  }

  return (
    <div className="w-full mt-2">
      {comments.map((comment) => {
        const depth1Replies = comment.replies.filter((r) => r.depth === 1);
        const depth2Replies = comment.replies.filter((r) => r.depth === 2);

        return (
          <div key={comment.commentId} className="">
            {/* 부모 댓글 */}
            <div className="px-5 py-4 border-b-1 border-gray-900">
              <p className="flex gap-2 mb-2 items-end">
                <span className="text-base font-medium text-white">{comment.writerNickname}</span>
                <span className="text-xs text-gray-600 font-medium">{comment.createdAt}</span>
              </p>

              <p className="text-sm text-gray-300 font-normal">{comment.content}</p>

              <div className="flex items-center mt-2">
                <span className="text-gray-600 text-sm font-medium pr-3 border-r border-gray-800 cursor-pointer">
                  답글 달기
                </span>
                <p className="flex gap-1 pl-3 items-center">
                  <HeartIcon
                    size={16}
                    active={likedMap[comment.commentId] ?? comment.isLiked}
                    onClick={() => toggleLike(comment.commentId)}
                    firstStroke="#736F6F"
                  />
                  <span className="text-sm font-normal text-gray-600">{comment.likeCount}</span>
                </p>
              </div>
            </div>

            {/* 대댓글 (depth 1) */}
            {depth1Replies.map((reply) => (
              <div key={reply.commentId} className="">
                <div className="flex gap-2 py-4 items-start border-b-1 border-gray-900 px-5">
                  <Image src={reply_arrow} alt="reply arrow" />

                  <div className="flex flex-col w-full">
                    <p className="flex gap-2 items-end">
                      <span className="text-base font-medium text-white">
                        {reply.writerNickname}
                      </span>
                      <span className="text-xs text-gray-600 font-medium">{reply.createdAt}</span>
                    </p>

                    <p className="text-xs font-normal text-gray-300">{reply.content}</p>

                    <div className="flex items-center mt-2">
                      <span className="text-gray-600 text-sm pr-3 border-r border-gray-800 cursor-pointer">
                        답글 달기
                      </span>
                      <p className="flex gap-1 pl-3 items-center">
                        <HeartIcon
                          size={14}
                          active={likedMap[reply.commentId] ?? reply.isLiked}
                          onClick={() => toggleLike(reply.commentId)}
                          firstStroke="#736F6F"
                        />
                        <span className="text-sm text-gray-600">{reply.likeCount}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/*  대대댓글 (depth 2) */}
                {depth2Replies
                  .filter((r) => r.parentCommentId === reply.commentId)
                  .map((child) => (
                    <div
                      key={child.commentId}
                      className="pl-13 py-4 border-b-1 border-gray-900 px-5"
                    >
                      <div className="flex gap-2 items-start">
                        <Image src={reply_arrow} alt="reply arrow" />

                        <div className="flex flex-col w-full">
                          <p className="flex gap-2 items-end">
                            <span className="text-base font-medium text-white">
                              {child.writerNickname}
                            </span>
                            <span className="text-xs text-gray-600 font-medium">
                              {child.createdAt}
                            </span>
                          </p>
                          <p>
                            <span className="text-gray-300 text-sm font-normal">
                              <span className="text-main-red-3 text-xs font-normal">
                                @{child.replyToNickname}{' '}
                              </span>
                              {child.content}
                            </span>
                          </p>
                          {/* 대대댓글은 답글 달기 없음 */}
                          <div className="flex items-center mt-2">
                            <HeartIcon
                              size={14}
                              active={likedMap[child.commentId] ?? child.isLiked}
                              onClick={() => toggleLike(child.commentId)}
                              firstStroke="#736F6F"
                            />
                            <span className="text-sm text-gray-600 ml-1">{child.likeCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
