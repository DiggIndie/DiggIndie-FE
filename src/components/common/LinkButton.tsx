import Link from 'next/link';

interface LinkButtonProps {
  disabled?: boolean;
  href: string | null;
  isFinished: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
}

export default function LinkButton({
  disabled,
  href,
  isFinished,
  children,
  onClick,
}: LinkButtonProps) {
  const isDisabled = disabled || !href || isFinished;
  return (
    <Link
      href={isDisabled ? '#' : href}
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        isDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      aria-disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
