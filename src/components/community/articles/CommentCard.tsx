import Image from "next/image";
import type { ArticleComment } from "@/types/articleComment";
import commentLikeBtn from "@/assets/community/commentLike.svg";
import type { User } from '@/types/user';

type Props = {
  author: User;
  comment: ArticleComment;
};

export default function CommentCard({ author, comment }: Props) {
  return (
    <div className="flex flex-col w-[375px] h-[126px]">
      <div className={"flex h-[22px] gap-[9px] px-[20px]"}>
        <span className={"w-[48px] text-[16px] text-white  font-medium"}>
          {author.name}
        </span>
        <span className={"w-[35px] text-[12px] text-gray-600 font-medium mt-[4px]"}>
          {comment.written}분 전
        </span>
      </div>
      <div className={"h-[44px] font-regular text-[14px] text-gray-300 mt-[4px] px-[20px]"}>
        {comment.content}
      </div>
      <div className={"flex h-[18px] px-[20px]"}>
        <span className={"text-[14px] font-medium text-gray-600"}>
          답글 달기
        </span>
        <span className={"border-r-[1px] border-gray-800 mr-[12px] ml-[12px]"} />
        <Image src={commentLikeBtn} alt={"like"} width={16} height={16} className={"mt-[2px]"}/>
        <span className={"text-[14px] font-regular text-gray-600 ml-[3px]"}>
          {comment.likes}
        </span>
      </div>
      <span className={"border-b-[1px] border-gray-900 mt-[16px]"} />
    </div>
  );
}
