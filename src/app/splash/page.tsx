'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Diggindie from '@/assets/common/diggindie.svg';

export default function SplashPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 1초 후 step을 1로 변경
    const changeStep = setTimeout(() => {
      setStep(1);
    }, 1000);

    // 2초 후 홈으로 이동
    const movePage = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => {
      clearTimeout(changeStep);
      clearTimeout(movePage);
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-[#140B0B] to-[#330301] gap-4 px-6 text-center">
      {step === 0 ? (
        <>
          <Image src={Diggindie} alt="logo" width={180} />
          <span className="text-base font-medium text-white/80">
            더 깊고 끝없는 음악 여정이 시작됩니다.
          </span>
        </>
      ) : (
        <>
          <span className="text-base font-medium text-white/80 leading-relaxed">
            취향에 맞는 인디뮤직 디깅을 편리하게,
            <br />
            공연 정보부터 뮤지션 발굴까지, 모든 것을 한 곳에서
          </span>
        </>
      )}
    </div>
  );
}
