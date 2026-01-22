'use client';

import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { useEffect, useState } from 'react';
import { boardDetailService } from '@/services/boardDetail.service';
import { FreeBoardDetail } from '@/types/board';
import { useAuthStore } from '@/stores/authStore';
import { useParams, useRouter } from 'next/navigation';
import { deleteFree } from '@/api/freeBoard';

export default function FreeArticleDetailPage() {
  const { isAuthed } = useAuthStore();
  const params = useParams();
  const router = useRouter();

  const boardId = Number(params.id);

  const [board, setBoard] = useState<FreeBoardDetail | null>(null);

  const addReply = (_content: string) => {};

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      const content = await boardDetailService.getFreeBoardDetail(boardId);
      setBoard(content);
    };

    fetchDetail();
  }, [boardId]);

  const handleEdit = () => {
    if (!boardId) return;
    router.push(`/community/write?mode=edit&board=free&id=${boardId}`);
  };

  const handleDelete = async () => {
    if (!boardId) return;

    const res = await deleteFree({ boardId });

    if (!res.isSuccess) {
      alert(res.message || '삭제에 실패했습니다.');
      return;
    }

    router.replace('/community/free');
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-[375px] relative bottom-0 pb-20">
      <ArticleHeader title="자유 라운지" isMine={true} onEdit={handleEdit} onDelete={handleDelete} />

      {!board ? (
        <div className="h-screen flex items-center justify-center">
          <span className="text-gray-300 font-normal text-base">없는 게시글입니다</span>
        </div>
      ) : isAuthed ? (
        <>
          <div className="pb-20">
            <ArticleBody content={board} />
            <CommentCard comments={board.comments} />
          </div>
          <ReplyInputSection addReply={addReply} />
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-56px)]">
          <span className="text-base font-normal text-[#A6A6A6]">로그인 후 가능한 페이지입니다</span>
        </div>
      )}
    </div>
  );
}
