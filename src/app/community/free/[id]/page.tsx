'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/freeDetailDummy.json';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { useEffect, useState } from 'react';
import { boardDetailService } from '@/services/boardDetail.service';
import { FreeBoardDetail } from '@/types/board';
import { useAuthStore } from '@/stores/authStore';
import { useParams } from 'next/navigation';

export default function FreeArticleDetailPage() {
  const { isAuthed } = useAuthStore();
  const params = useParams();
  const boardId = Number(params.id);

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
      {/*추후 수정 예정 반환데이터에 isMine추가 필요 */}
      <ArticleHeader title="자유 라운지" isMine={true} />
      {!board ? (
        <div className="h-screen flex items-center justify-center">
          <span className="text-gray-300 font-normal text-base">없는 게시글입니다</span>
        </div>
      ) : isAuthed ? (
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
