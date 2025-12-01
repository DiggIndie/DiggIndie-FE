import goBack from '@/assets/onBoard/arrow.svg';
import Image from 'next/image';
import Link from 'next/link';
export default function OnBoardHeader() {
  return (
    <header className="w-full flex items-start bg-transparent px-5 py-3">
      <Link href="/">
        <Image src={goBack} alt="DiggIndie Logo" className="h-6 w-6" />
      </Link>
    </header>
  );
}
