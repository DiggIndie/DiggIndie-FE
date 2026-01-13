import Image from 'next/image';
import back from '@/assets/common/back.svg';
export default function CommunityHeader() {
  return (
    <header className="px-5 py-3 flex justify-between w-full mb-3">
      <Image src={back} width={24} height={24} alt="back" />
      <span className="font-semibold text-base text-white">게시물 작성</span>
      <button className="text-normal text-sm text-gray-700 cursor-pointer">완료</button>
    </header>
  );
}
