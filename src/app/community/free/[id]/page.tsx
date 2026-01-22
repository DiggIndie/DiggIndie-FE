'use client';
import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/freeDetailDummy.json';
import ArticleBody from '@/components/community/ArticleBody';
import ReplyInputSection from '@/components/community/ReplyInputSection';
import { use, useEffect, useState } from 'react';
import { boardDetailService } from '@/services/boardDetail.service';
import { BoardDetail } from '@/types/board';
// import { useParams } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function FreeArticleDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const boardId = Number(resolvedParams.id);

  const [comments, setComments] = useState(freeDetailData.comments);
  const [board, setBoard] = useState<BoardDetail>();

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
      <div className="mt-10 pb-20">
        <ArticleBody content={board} />
        <CommentCard comments={comments} />
      </div>
      <ReplyInputSection addReply={addReply} />
    </div>
  );
}
