'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';

export default function FindPw() {
  const [isEmailSent, setIsEmailSent] = useState(false); // 인증번호 전송 버튼 클릭 여부
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증번호 확인 성공 여부
  const [form, setForm] = useState({
    id: '',
    email: '',
    emailConfirm: '',
  });
  const [errors, setErrors] = useState<{
    id?: string;
    email?: string;
    emailConfirm?: string;
  }>({});

  // 1. 이메일 중복 체크 및 인증번호 전송
  const handleEmailCheck = async () => {
    try {
      // API: 이메일 중복 체크 및 전송 (서버에서 중복이면 에러를 던진다고 가정)
      await authService.checkEmail(form.email, 'PASSWORD_RESET');
      setIsEmailSent(true);
      setErrors((prev) => ({ ...prev, email: '인증번호가 전송되었습니다.' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: '이미 가입된 이메일입니다.' }));
    }
  };

  // 2. 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const isValid = await authService.verifyCode(
        form.email,
        form.emailConfirm,
        'PASSWORD_RESET',
        'stringst'
      );
      if (isValid) {
        setIsEmailVerified(true);
        setErrors((prev) => ({ ...prev, emailConfirm: '인증되었습니다.' }));
      } else {
        setErrors((prev) => ({ ...prev, emailConfirm: '인증번호가 일치하지 않습니다.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, emailConfirm: '인증 확인 중 오류가 발생했습니다.' }));
    }
  };
  return (
    <div className="w-full bg-black flex flex-col items-center px-5 py-6 gap-3">
      {/* 이메일 입력, 인증정보 */}
      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="email"
            placeholder="아이디 입력"
            className="w-full bg-transparent text-[#8C8787] text-[16px]
             placeholder:text-[#736F6F] px-4 border-b-[1px] border-[#4A4747] pb-1 focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer">
          확인
        </button>
      </div>

      {/* 이메일 입력 */}
      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="이메일 입력"
            className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button
          className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#BEBABA] text-[12px] font-medium cursor-pointer"
          onClick={handleEmailCheck}
        >
          인증번호 전송
        </button>
      </div>

      <div className="w-[335px] flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="인증번호 입력"
            className="w-full bg-transparent  px-4 text-[#8C8787] placeholder:text-[#736F6F] border-b-[1px] border-[#4A4747] pb-1
                       focus:outline-none focus:border-white focus:text-white"
          />
        </div>
        <button
          className="w-[87px] h-[33px] rounded-[4px] bg-[#4B4747] text-[#D0CBCB] text-[12px] font-medium cursor-pointer"
          onClick={handleVerifyCode}
        >
          확인
        </button>
      </div>

      {/* 아이디 찾기 빨간 버튼 */}
      <Link href="/auth/find/pw/reset">
        <button className="w-[335px] h-[52px] mt-4 rounded-[4px] bg-[#FF3637] text-white text-base font-semibold cursor-pointer">
          인증 확인
        </button>
      </Link>
    </div>
  );
}
