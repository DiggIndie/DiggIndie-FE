"use client";

import Image from "next/image";
import backBtn from "@/assets/community/back.svg";
import { usePathname, useRouter } from "next/navigation";

export default function ArticleHeader() {
  const pathname = usePathname();
  const router = useRouter();

  let title = "커뮤니티";

  if (pathname.startsWith("/community/free")) {
    title = "자유 게시판";
  } else if (pathname.startsWith("/community/info")) {
    title = "정보 공유";
  } else if (pathname.startsWith("/community/trade")) {
    title = "거래/양도";
  }

  return (
    <div className="w-[375px] h-[92px] flex flex-col items-center">
      <div className="h-[48px]" />
      <div className="relative w-[375px] h-[44px] flex items-center justify-center px-[20px]">
        <button onClick={() => router.back()} className="absolute left-[20px] cursor-pointer">
          <Image src={backBtn} alt="back" width={24} height={24} />
        </button>

        <span className="font-semi-bold text-center text-[16px]">
          {title}
        </span>
      </div>
    </div>
  );
}
