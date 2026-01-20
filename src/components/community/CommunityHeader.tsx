'use client';
import Image from 'next/image';
import searchBtn from '@/assets/common/search.svg'
import writeBtn from '@/assets/common/write.svg'
import menuBtn from '@/assets/common/hamburger.svg'

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function CommunityHeader({ title, onHamburgerClick }: props) {

  return (
    <div className="bg-black w-full h-[52px] flex items-center px-5 py-3 top-0 z-50 justify-between">
      <span className="text-[20px] font-semibold">{title}</span>
      <div className={"flex gap-[10px]"}>
        <Image src={searchBtn} alt={"search"} width={24} height={24} className={'cursor-pointer'} />
        <Image src={writeBtn} alt={"write"} width={24} height={24} className={'cursor-pointer'} />
        <Image src={menuBtn} alt={"menu"} width={24} height={24} className={'cursor-pointer'} onClick={onHamburgerClick} />
      </div>
    </div>
  );
}
