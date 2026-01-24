'use client';

import { Checkbox } from '@mui/material';
import Image from 'next/image';
import sendIcon from '@/assets/community/Send.svg';
import { useState } from 'react';
interface Props {
  addReply: (content: string) => void;
}
export default function ReplyInputSection({ addReply }: Props) {
  const [input, setInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const handleSend = () => {
    if (!input.trim()) return;
    addReply(input);
    setInput('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSend();
  };
  return (
    <section className="fixed bottom-0 p-5 min-w-[375px] z-30">
      <div className="bg-gray-800 px-4 py-3 rounded-sm">
        <Checkbox
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          disableRipple
          sx={{
            width: 20,
            height: 20,
            padding: 0,
            borderRadius: '4px',
            border: '1px solid #8C8888', // gray-500
            backgroundColor: isChecked ? '#ef4444' : '#8C8888',

            '&.Mui-checked': {
              backgroundColor: '#ef4444', // 빨간 배경
              borderColor: '#dc2626',
            },
            '&.Mui-checked::after': {
              content: '"✔"',
              color: '#fff', //체크 색
              fontSize: 12,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '&:hover': {
              backgroundColor: isChecked ? '#ef4444' : '#8C8888',
            },
            '& .MuiSvgIcon-root': {
              display: 'none',
            },
          }}
        />
        <span
          className={`text-sm font-medium ${isChecked ? 'text-main-red-2' : 'text-gray-400'} pl-1 pr-2`}
        >
          익명
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="댓글을 입력하세요."
          className="focus:outline-none font-normal text-sm placeholder-gray-600"
        />
        <Image
          src={sendIcon}
          alt="send"
          width={20}
          height={20}
          className="float-right cursor-pointer"
          onClick={handleSend}
        />
      </div>
    </section>
  );
}
