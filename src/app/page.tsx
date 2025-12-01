import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <Link href="onboard/artist">온보딩 페이지로 이동</Link>
      </div>
    </div>
  );
}
