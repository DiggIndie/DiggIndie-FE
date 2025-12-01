import Link from 'next/link';

interface ButtonProps {
  bgColor: string;
  href: string;
  children: React.ReactNode; // 버튼 텍스트
}

export default function Button({ bgColor = 'bg-red-500', href, children }: ButtonProps) {
  return (
    <Link href={href}>
      <button className={`bg-red p-4 h-13 w-full font-semibold ${bgColor}`}>{children}</button>
    </Link>
  );
}
