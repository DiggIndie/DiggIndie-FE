import goBack from '@/assets/onBoard/arrow.svg';
import Image from 'next/image';
export default function OnBoardHeader() {
  return (
    <header className="w-full flex min-h-screen w-full items-start bg-transparent">
      <div className="flex justify-start items-center">
        <Image src={goBack} alt="DiggIndie Logo" className="h-6 w-6" />
      </div>
    </header>
  );
}
