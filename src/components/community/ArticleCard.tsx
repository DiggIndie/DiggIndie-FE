import Image from "next/image";
import type { ArticleBase } from "@/types/articleBase";

type Props = {
  article: ArticleBase;
};
//id를 free/info 게시글로 분리해두긴 했는데 articleCard는 UI 컴포넌트여서 id는 필요 없다고 가정하고 그냥 articleBase를 사용

export default function ArticleCard({ article }: Props) {
  return (
    <div className="w-[375px] h-[96px] flex items-center border-b-[1px] border-gray-900 py-[12px] px-[20px] justify-between">
      <div className="flex flex-col min-w-0 pr-[24px]">
        <p className="text-white text-[16px] h-[27px] font-medium truncate">
          {article.title}
        </p>

        <p className="text-[#A5A1A1] text-[14px] h-[20px] font-regular truncate">
          {article.content}
        </p>

        <div className="flex text-gray-500 text-[12px] font-medium gap-[9px] mt-[8px]">
          <span>{article.written}분 전</span>
          <span>조회 {article.view}</span>
        </div>
      </div>

      <div className="relative w-[70px] h-[70px] flex-shrink-0 rounded-[4px] overflow-hidden bg-gray-400">
        <Image
          src={article.images[0]}
          alt={article.title}
          fill
          sizes="70px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
