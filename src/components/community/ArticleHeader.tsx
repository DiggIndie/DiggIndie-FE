'use client';

import Image from 'next/image';
import backBtn from '@/assets/common/back.svg';
import { usePathname, useRouter } from 'next/navigation';

export default function ArticleHeader() {
  const pathname = usePathname();
  const router = useRouter();

  let title = '커뮤니티';

  if (pathname.startsWith('/community/free')) {
    title = '자유 라운지';
  } else if (pathname.startsWith('/community/trade')) {
    title = '거래/양도';
  }

  return (
    <div className="w-full flex items-center px-5 py-[10px] justify-start gap-3 text-white relative h-11">
      <Image
        src={backBtn}
        alt="back"
        width={24}
        height={24}
        onClick={() => router.back()}
        className="cursor-pointer absolute left-[16px] flex items-center"
      />

      <span className="font-semibold text-base absolute left-1/2 -translate-x-1/2">{title}</span>
    </div>
  );
}
