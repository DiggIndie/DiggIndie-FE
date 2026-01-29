import Image from 'next/image';
import hamburger from '@/assets/common/hamburger.svg';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function SearchHeader({ title, onHamburgerClick }: props) {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent ">
      <div className="mx-auto flex h-13 py-3 w-full max-w-[375px] items-center justify-between px-5 bg-black">
        <span className="font-semibold text-white text-xl">{title}</span>
        <Image
          src={hamburger}
          alt="menu"
          width={24}
          height={24}
          className={'cursor-pointer'}
          onClick={onHamburgerClick}
        />
      </div>
    </header>
  );
}
