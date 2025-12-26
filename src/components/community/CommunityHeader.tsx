"use client";

import Image from "next/image";
import searchBtn from "@/assets/community/search.svg";
import hamburgerBtn from "@/assets/community/hamburger.svg";
import writeBtn from "@/assets/community/write.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CommunityHeader() {

  const pathname = usePathname();

  const isFree = pathname.startsWith("/community/free");
  const isInfo = pathname.startsWith("/community/info");
  const isTrade = pathname.startsWith("/community/trade");

  return (
    <div className="w-[375px] h-[142px] flex flex-col items-center font-bold bg-black">
      <div className="h-[48px]" />

      <div className="flex h-[94px] items-center font-bold gap-[176.5px]">
        <span className="w-[68px] h-[28px] font-semibold">커뮤니티</span>
        <div className="flex w-[92px] h-[24px] justify-between">
          <Image src={searchBtn} alt="search" className="w-[24px] h-[24px]" />
          <Image src={writeBtn} alt="write" className="w-[24px] h-[24px]" />
          <Image src={hamburgerBtn} alt="menu" className="w-[24px] h-[24px]" />
        </div>
      </div>

      <div className="flex justify-center h-[42px] text-[16px] gap-[24px] mr-auto ml-[20px]">
        <Link
          href="/community/free"
          className={`relative w-[70px] font-medium cursor-pointer ${
            isFree ? "text-white" : "text-gray-600"
          }`}
        >
          자유게시판
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {isFree && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </Link>

        <Link
          href="/community/info"
          className={`relative w-[68px] font-medium cursor-pointer ${
            isInfo ? "text-white" : "text-gray-600"
          }`}
        >
          정보 공유
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {isInfo && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </Link>

        <Link
          href="/community/trade"
          className={`relative w-[68px] font-medium cursor-pointer ${
            isTrade ? "text-white" : "text-gray-600"
          }`}
        >
          거래/양도
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {isTrade && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </Link>
      </div>
    </div>
  );
}
