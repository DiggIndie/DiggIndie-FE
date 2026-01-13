'use client';

import next from '@/assets/common/more.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  isLoggedIn: boolean;
};

export default function ResetPreference({ isLoggedIn }: Props) {
  const router = useRouter();
  if (!isLoggedIn) return null;

  return (
    <div
      className="flex w-full max-w-[335px] h-[46px] bg-[#FF3637] mt-[40px] items-center rounded-[4px] cursor-pointer"
      onClick={() => router.push('/onboard/artist')}
    >
      <div className="min-w-0 grow-0 shrink text-[16px] ml-[12px] font-semibold">
        <span className="block truncate">취향 재설정 하러 가기</span>
      </div>

      <div className="w-[16px] h-[16px] ml-[4px] shrink-0 flex items-center justify-center">
        <Image src={next} alt="next" width={16} height={16} />
      </div>
    </div>
  );
}
