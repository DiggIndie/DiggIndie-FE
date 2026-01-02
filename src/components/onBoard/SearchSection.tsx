import GraySearchIcon from '@/components/iconComponents/SearchIcon';
interface SearchSectionProps {
  searchTerm: string;
  onChange: (value: string) => void;
}
export default function SearchSection({ searchTerm, onChange }: SearchSectionProps) {
  return (
    <section className="w-full flex bg-gray-700 rounded-sm justify-between px-2 py-3">
      <input
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="outline-none text-[#A6A6A6]"
      />
      <GraySearchIcon className="text-gray-300" />
    </section>
  );
}
