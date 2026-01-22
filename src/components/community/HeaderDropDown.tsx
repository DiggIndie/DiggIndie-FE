import pencil from '@/assets/community/Edit.svg';
import trash from '@/assets/community/Trash.svg';
import Image from 'next/image';
export default function HeaderDrowDown() {
  return (
    <section className="bg-BG border border-gray-600 p-2 flex flex-col absolute top-11 right-5 rounded-sm gap-1 w-34">
      <p className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-850 rounded-sm">
        <span className="text-sm font-normal text-white">수정</span>
        <Image src={pencil} alt="수정 아이콘" />
      </p>
      <p className="flex justify-between items-center cursor-pointer px-2 py-1 hover:bg-gray-850 rounded-sm">
        <span className="text-sm font-normal text-white">삭제</span>
        <Image src={trash} alt="삭제 아이콘" />
      </p>
    </section>
  );
}
