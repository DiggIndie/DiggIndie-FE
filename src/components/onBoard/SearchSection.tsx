import searchIcon from '@/assets/onBoard/search.svg';
import Image from 'next/image';

export default function SearchSection() {
  return (
    <section className="w-full flex p-2 bg-gray-700 rounded- flex gap-3">
      <Image src={searchIcon} alt="돋보기 아이콘" />
      <input placeholder="검색어를 입력하세요" className="w-full" />
    </section>
  );
}
