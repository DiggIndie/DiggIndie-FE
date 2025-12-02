import Link from 'next/link';

interface ButtonProps {
  bgColor: string;
  href: string;
  children: React.ReactNode; // 버튼 텍스트
}

export default function Button({ bgColor, href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`block p-4 h-13 w-full font-semibold cursor-pointer text-center ${bgColor}`}
    >
      {children}
    </Link>
  );
}
