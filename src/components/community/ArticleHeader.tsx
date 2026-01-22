'use client';

import Image from 'next/image';
import backBtn from '@/assets/common/back.svg';
import { useRouter } from 'next/navigation';
import communityMore from '@/assets/community/Menu Kebab Vertical.svg';
import { useState } from 'react';
import HeaderDrowDown from './HeaderDropDown';

interface ArticleHeaderProps {
  title: string;
}
export default function ArticleHeader({ title }: ArticleHeaderProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <section className="w-full flex flex-col px-5 py-[10px] max-w-[inherit] text-white h-11 fixed top-0 z-10 bg-transparent relative">
      <div className="flex justify-between items-center">
        <Image
          src={backBtn}
          alt="back"
          width={24}
          height={24}
          onClick={() => router.back()}
          className="cursor-pointer flex items-center"
        />

        <span className="font-semibold text-base text-white">{title}</span>
        <Image
          src={communityMore}
          alt="헤더 더보기 아이콘"
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>
      {isDropdownOpen && <HeaderDrowDown />}
    </section>
  );
}
