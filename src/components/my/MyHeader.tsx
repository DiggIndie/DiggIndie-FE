'use client';
import Image from 'next/image';
import backIcon from '@/assets/onBoard/arrow.svg';
import { useRouter } from 'next/navigation';

type props = {
  title: string;
  backUrl?: string;
};

export default function MyHeader({ title }: props) {
  const router = useRouter();
  return (
    <div className="bg-black w-full flex items-center px-5 py-3 justify-center top-0 z-50">
      <Image
        src={backIcon}
        alt="이전"
        width={24}
        height={24}
        onClick={() => router.push('/my')}
        className="cursor-pointer absolute left-5"
      />
      <span className="text-base font-semibold">{title}</span>
    </div>
  );
}
