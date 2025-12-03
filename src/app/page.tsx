import Link from "next/link";

export default function Home() {

  return (
    <div className="flex w-[50px] h-[30px] justify-center items-center w-[50px] h-50px] bg-zinc-50 font-sans dark:bg-black">
      <Link href="/home">
        GO TO HOME
      </Link>
    </div>
  );
}
