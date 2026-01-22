'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/freeDetailDummy.json';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { use, useEffect, useState } from 'react';
import { boardDetailService } from '@/services/boardDetail.service';
import { FreeBoardDetail } from '@/types/board';
import { useAuthStore } from '@/stores/authStore';
// import { useParams } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function FreeArticleDetailPage({ params }: Props) {
  const { isAuthed } = useAuthStore();
  const resolvedParams = use(params);
  const boardId = Number(resolvedParams.id);

  const [comments, setComments] = useState(freeDetailData.comments);
  const [board, setBoard] = useState<FreeBoardDetail>();

  const addReply = (content: string) => {
    setComments((prev) => [
      ...prev,
      {
        commentId: Date.now(),
        member: {
          memberId: -1, // 임시값
          nickname: '나',
        },
        content,
        isLiked: false,
        likeCount: 0,
        hasParent: false,
        parentId: null,
      },
    ]);
  };
  useEffect(() => {
    if (!boardId) return;
    const fetchDetail = async () => {
      const content = await boardDetailService.getFreeBoardDetail(boardId);
      setBoard(content);
    };

    fetchDetail();
  }, [boardId]);

  return (
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 pb-20 ">
      <ArticleHeader title="자유 라운지" />
      {isAuthed ? (
        <>
          <div className="pb-20">
            <ArticleBody content={board} />
            <CommentCard comments={board?.comments} />
          </div>
          <ReplyInputSection addReply={addReply} />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-56px)]">
          <span className="text-base font-normal text-[#A6A6A6]">
            로그인 후 가능한 페이지입니다
          </span>
        </div>
      )}
    </div>
  );
}
