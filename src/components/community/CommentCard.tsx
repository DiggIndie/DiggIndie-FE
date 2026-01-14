import Image from 'next/image';
import commentLikeBtn from '@/assets/community/Heart.svg';

interface Comment {
  commentId: number;
  content: string;
  hasParent: boolean;
  parentId: number | null;
  member: {
    memberId: number;
    nickname: string;
  };
}

export default function CommentCard({ comments }: { comments: Comment[] }) {
  const parents = comments.filter((c) => !c.hasParent);
  const replies = comments.filter((c) => c.hasParent);

  return (
    <div className="w-full ">
      {parents.map((comment) => (
        <div key={comment.commentId} className="px-5 py-4">
          <p className="flex gap-[9px] px-[20px]">
            <span className="text-[16px] font-medium">{comment.member.nickname}</span>
            <span>12분전</span>
          </p>

          <div className="text-[14px] text-gray-300 mt-[4px] px-[20px]">{comment.content}</div>

          {replies
            .filter((r) => r.parentId === comment.commentId)
            .map((reply) => (
              <div key={reply.commentId} className="ml-[40px] mt-[8px] text-gray-400">
                ↳ {reply.member.nickname}: {reply.content}
              </div>
            ))}

          <div className="flex items-center gap-[4px] px-[20px] mt-[6px]">
            <Image src={commentLikeBtn} alt="like" width={16} height={16} />
            <span className="text-[14px] text-gray-600">0</span>
          </div>

          <span className="block border-b border-gray-900 mt-[12px]" />
        </div>
      ))}
    </div>
  );
}
