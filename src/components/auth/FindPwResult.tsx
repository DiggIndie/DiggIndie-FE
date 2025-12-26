"use client";

import React from "react";
export default function FindPwResult() {
  return (
    <div className="w-[375px] bg-black flex flex-col text-[16px] items-center px-[20px] mt-[58px]">
      <span className={' mb-[59px]'}>
        비밀번호 재설정이 완료되었습니다
      </span>
        <button className="w-[335px] h-[52px] mt-4 rounded-[4px] bg-[#FF3637] text-white text-base font-bold cursor-pointer">
          로그인 페이지 가기
        </button>

    </div>
  );
}
