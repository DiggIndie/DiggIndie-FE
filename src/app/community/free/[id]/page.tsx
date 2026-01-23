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
import { likeFree } from '@/api/freeBoard';


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

  //게시글 좋아요
  const handleToggleLike = async () => {
    if (!board) return;

    const prev = {
      isLiked: board.isLiked,
      likeCount: board.likeCount,
    };

    // UI 좋아요 수 즉시 반영
    setBoard((prevBoard) =>
      prevBoard
        ? {
          ...prevBoard,
          isLiked: !prevBoard.isLiked,
          likeCount: prevBoard.isLiked
            ? prevBoard.likeCount - 1
            : prevBoard.likeCount + 1,
        }
        : prevBoard
    );

    try {
      const res = await likeFree({ boardId });
      if (!res.isSuccess) {
        // 본인 글 좋아요 방지
        if (res.statusCode === 400) {
          alert('자신의 글에는 좋아요를 누를 수 없습니다.');

          // 롤백
          setBoard((prevBoard) =>
            prevBoard
              ? {
                ...prevBoard,
                isLiked: prev.isLiked,
                likeCount: prev.likeCount,
              }
              : prevBoard
          );
          return;
        }
      }

      // 서버 기준 좋아요 수
      setBoard((prevBoard) =>
        prevBoard
          ? {
            ...prevBoard,
            isLiked: res.payload.isLiked,
            likeCount: res.payload.likeCount,
          }
          : prevBoard
      );
    } catch {
      // 실패 시
      setBoard((prevBoard) =>
        prevBoard
          ? {
            ...prevBoard,
            isLiked: prev.isLiked,
            likeCount: prev.likeCount,
          }
          : prevBoard
      );

      alert('좋아요 처리에 실패했습니다.');
    }
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
            <ArticleBody
              content={board}
              onToggleLike={handleToggleLike}
            />
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
