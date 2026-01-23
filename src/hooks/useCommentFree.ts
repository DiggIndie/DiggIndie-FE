'use client';

import { useCallback, useState } from 'react';
import { commentFree } from '@/api/freeBoard';
import { boardDetailService } from '@/services/boardDetail.service';
import type { FreeBoardDetail } from '@/types/board';

type Params = {
  boardId: number;
  setBoard: React.Dispatch<React.SetStateAction<FreeBoardDetail | null>>;
};

export type SubmitFreeCommentArgs = {
  content: string;
  isAnonymous: boolean;
  parentCommentId?: number | null;
};

export function useCommentFree({ boardId, setBoard }: Params) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitComment = useCallback(
    async ({ content, isAnonymous, parentCommentId = null }: SubmitFreeCommentArgs) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      setIsSubmitting(true);
      setError(null);

      try {
        const res = await commentFree({
          boardId,
          content: trimmed,
          isAnonymous,
          parentCommentId,
        });

        if (!res.isSuccess) {
          setError(res.message || '댓글 작성에 실패했습니다.');
          return;
        }

        const fresh = await boardDetailService.getFreeBoardDetail(boardId);
        setBoard(fresh);
      } catch {
        setError('댓글 작성에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [boardId, setBoard]
  );

  return {
    submitComment,
    isSubmitting,
    error,
  };
}
