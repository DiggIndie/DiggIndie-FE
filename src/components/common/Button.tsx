interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode; // 버튼 텍스트
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({ disabled, children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      className={`block p-4 h-13 w-full font-semibold text-center rounded-sm ${
        disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-red cursor-pointer'
      }`}
      type={type}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
