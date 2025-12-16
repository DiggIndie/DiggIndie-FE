"use client";

import React from "react";
import Link from 'next/link';

export default function ResetPw() {
  return (
    <div className="w-[375px] bg-black flex flex-col items-center px-[20px] py-6 gap-4">

      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="새로운 비밀번호 재설정"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#8C8787]
                       border-b border-[#8C8787] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#D0CBCB] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="새로운 비밀번호 확인"
            className="w-full bg-transparent text-[#8C8787] placeholder:text-[#8C8787]
                       border-b border-[#8C8787] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#D0CBCB] text-[12px] font-medium cursor-pointer">
          인증번호 전송
        </button>
      </div>

      {/* 아이디 찾기 빨간 버튼 */}
      <Link href="/auth/find/pw/reset/result">
        <button className="w-[335px] h-[52px] mt-4 rounded-[4px] bg-[#FF3637] text-white text-base font-bold cursor-pointer">
          비밀번호 재설정
        </button>
      </Link>
    </div>
  );
}
