import Image from "next/image";
import type { User } from "@/types/user";

type Props = {
  author: User;
  written: number;
};

export default function ArticleAuthorRow({ author, written }: Props) {
  return (
    <div className="w-[375px] px-[20px] flex items-center gap-[12px] mt-[16px]">
      <div className="relative w-[44px] h-[44px] rounded-full overflow-hidden ">
        <Image
          src={author.avatarUrl}
          alt={author.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-white text-[16px] font-medium">
          {author.name}
        </span>
        <span className="text-gray-600 text-[12px] font-medium mt-[2px]">
          {written}분 전
        </span>
      </div>
    </div>
  );
}
