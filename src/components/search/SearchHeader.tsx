import Image from 'next/image';
import hamburger from '@/assets/common/hamburger.svg';
import homeBtn from '@/assets/common/homeBtn.svg'
import { useRouter } from 'next/navigation';

type props = {
  title: string;
  onHamburgerClick: () => void;
};

export default function SearchHeader({ title, onHamburgerClick }: props) {
  const router = useRouter()

  return (
    <div className="w-full h-13 items-center font-semibold bg-black px-5 py-3">
      <div className="flex items-center justify-between text-[20px]">
        <span>{title}</span>
        <div>
          <Image
            src={homeBtn}
            alt="menu"
            width={24}
            height={24}
            className={'cursor-pointer'}
            onClick={onHamburgerClick}
          />
          <Image
            src={hamburger}
            alt="menu"
            width={24}
            height={24}
            className={'cursor-pointer'}
            onClick={()=>router.push('/home')}
          />
        </div>
      </div>
    </div>
  );
}
