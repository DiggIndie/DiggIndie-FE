"use client";

import { useState } from "react";
import Image from "next/image";
import searchBtn from "@/assets/community/search.svg";
import hamburgerBtn from "@/assets/community/hamburger.svg";
import writeBtn from "@/assets/community/write.svg";

type TabKey = "free" | "info" | "trade";

export default function CommunityHeader() {
  const [activeTab, setActiveTab] = useState<TabKey>("free");

  return (
    <div className="w-[375px] h-[142px] flex flex-col items-center font-bold bg-black">
      <div className="h-[48px]" />

      <div className="flex h-[94px] items-center font-bold gap-[176.5px]">
        <span className="w-[68px] h-[28px] font-semibold">
          커뮤니티
        </span>
        <div className="flex w-[92px] h-[24px] justify-between">
          <Image src={searchBtn} alt="search" className="w-[24px] h-[24px]" />
          <Image src={writeBtn} alt="write" className="w-[24px] h-[24px]" />
          <Image src={hamburgerBtn} alt="menu" className="w-[24px] h-[24px]" />
        </div>
      </div>

      <div className="flex justify-center h-[42px] text-[16px] gap-[24px] mr-auto ml-[20px]">
        <span
          onClick={() => setActiveTab("free")}
          className={`relative w-[70px] font-medium cursor-pointer ${
            activeTab === "free" ? "text-white" : "text-gray-600"
          }`}
        >
          자유게시판
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {activeTab === "free" && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </span>

        <span
          onClick={() => setActiveTab("info")}
          className={`relative w-[68px] font-medium cursor-pointer ${
            activeTab === "info" ? "text-white" : "text-gray-600"
          }`}
        >
          정보 공유
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {activeTab === "info" && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </span>

        <span
          onClick={() => setActiveTab("trade")}
          className={`relative w-[68px] font-medium cursor-pointer ${
            activeTab === "trade" ? "text-white" : "text-gray-600"
          }`}
        >
          거래/양도
          <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-800" />
          {activeTab === "trade" && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-white" />
          )}
        </span>
      </div>
    </div>
  );
}
