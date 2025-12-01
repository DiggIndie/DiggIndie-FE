import React from 'react';

interface TitleSectionProps {
  title: React.ReactNode;
  min: string;
}

export default function TitleSection({ title, min }: TitleSectionProps) {
  return (
    <div className="w-full flex justify-center items-end gap-2 px-5">
      <span className="font-bold text-2xl leading-[var(--line-height-title)] tracking-[var(--letter-spacing-title)]">
        {title}
      </span>
      <span className="text-gray-700 text-xs font-medium leading-[var(--line-height-text)] tracking-[var(--letter-spacing-text)]">
        {min}
      </span>
    </div>
  );
}
