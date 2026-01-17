import xbutton from '@/assets/auth/xButton.svg';
import Image from 'next/image';

export default function RecentSearchSection() {
  const recentSearches = ['dd', 'example2', 'example3']; // 예시 최근 검색어 배열

  return (
    <section className="px-5 flex gap-3 flex-col">
      <p className="flex justify-between">
        <span className="text-gray-600 text-xs font-medium">최근 검색어</span>
        <span className="text-gray-600 text-xs font-medium border-b border-gray-600">
          전체 삭제
        </span>
      </p>
      <div className="flex gap-2 flex-wrap">
        {recentSearches.map((term) => (
          <span
            key={term}
            className="cursor-pointer bg-gray-850 border-gray-700 text-gray-300 text-xs font-medium px-2 py-1 flex gap-1 rounded-xs justify-between items-center border-gray-700 border min-w-[60px] "
          >
            {term}
            <Image src={xbutton} alt="x button" height={16} width={16} className="cursor-pointer" />
          </span>
        ))}
      </div>
    </section>
  );
}
