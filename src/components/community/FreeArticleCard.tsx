import Image from "next/image";
import type { FreeArticles } from "@/types/freeArticles";

type Props = {
  article: FreeArticles;
};

export default function FreeArticleCard({ article }: Props) {
  return (
    <div className="h-[96px] flex items-center border-b-[1px] border-gray-800
    py-[12px] px-[20px] justify-between">
      <div className="flex flex-col min-w-0  pr-[24px]">
        {/* title */}
        <p className="text-white text-[16px] h-[27px] font-medium truncate">
          {article.title}
        </p>

        {/* content */}
        <p className="text-[#A5A1A1] text-[14px] h-[20px] font-regular truncate">
          {article.content}
        </p>

        {/* meta */}
        <div className="flex text-gray-500 text-[12px] font-medium gap-[9px] mt-[8px]">
          <span>{article.written}분 전</span>
          <span>조회 {article.view}</span>
        </div>
      </div>

      {/* thumbnail */}
      <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-[8px] overflow-hidden bg-[#D9D9D9]">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          sizes="72px"
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
