import Image from "next/image";
import type { ArticleBase } from "@/types/articleBase";
import likeBtn from "@/assets/community/likes.svg";
import commentsBtn from "@/assets/community/comments.svg";

type Props = {
  article: ArticleBase;
};

export default function ArticleBody({ article }: Props) {
  return (
    <div className="flex flex-col w-[375px] mt-[16px]">
      <div className={"pl-[20px]"}>
        <div className={"h-[28px] font-semibold text-[20px] mb-[8px]"}>
          {article.title}
        </div>
        <div className={"h-[100px] text-[14px] text-gray-300 font-regular mb-[20px]"}>
          {article.content}
        </div>

        {/*이미지 row*/}
        {article.images.length > 0 && (
          <div className="flex gap-[12px] overflow-x-auto">
            {article.images.map((src, idx) => (
              <div key={`${src}-${idx}`} className="relative w-[200px] h-[200px] flex-none rounded-[4px] overflow-hidden bg-[#2A2A2A]">
                <Image
                  src={src}
                  alt={`article-image-${idx + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* 좋아요, 댓글 수 */}
        <div className={"flex w-[110px] h-[24px] mt-[20px] gap-[3px] text-[14px] font-regular"}>
          <Image src={likeBtn} alt="like" width={24} height={24} />
          <span className={"h-[20px] w-[26px] mt-[2px]"}>
          {article.likes}
        </span>
          <Image src={commentsBtn} alt="comment" width={24} height={24} className={"ml-[10px]"}/>
          <span className={"h-[20px] w-[26px] mt-[2px]"}>
          {article.comments.length}
        </span>
        </div>
      </div>
      <span className={"t-0 border-b-[4px] border-[#332F2F] mt-[16px]"} />
    </div>

  );
}
