'use client';

import { Checkbox } from '@mui/material';
import Image from 'next/image';
import sendIcon from '@/assets/community/Send.svg';
import { useEffect, useRef, useState } from 'react';

interface Props {
  addReply: (content: string, isAnonymous: boolean) => void;
  disabled?: boolean;
  replyTarget?: { parentCommentId: number; nickname: string } | null; //답글일땐 닉네임 자동 채우기
  onCancelReply?: () => void;
}

export default function ReplyInputSection({ addReply, disabled, replyTarget, onCancelReply }: Props) {
  const [input, setInput] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!replyTarget) return;

    const mention = `@${replyTarget.nickname} `;

    setInput((prev) => {
      const prevTrim = prev.trim();
      // 사용자가 이미 뭔가 쓰고 있으면 덮어쓰지 않기 (단, 멘션 시작이면 갱신)
      if (prevTrim.length === 0) return mention;
      if (prev.startsWith('@')) return mention;
      return prev;
    });

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      const v = inputRef.current?.value ?? '';
      inputRef.current?.setSelectionRange(v.length, v.length);
    });
  }, [replyTarget]);

  const handleSend = () => {
    if (disabled) return;
    if (!input.trim()) return;

    addReply(input, isChecked);
    setInput('');
    onCancelReply?.(); // 답글 모드 해제
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
            border: '1px solid #8C8888',
            backgroundColor: isChecked ? '#ef4444' : '#8C8888',
            '&.Mui-checked': { backgroundColor: '#ef4444', borderColor: '#dc2626' },
            '&.Mui-checked::after': {
              content: '"✔"',
              color: '#fff',
              fontSize: 12,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '&:hover': { backgroundColor: isChecked ? '#ef4444' : '#8C8888' },
            '& .MuiSvgIcon-root': { display: 'none' },
          }}
        />

        <span
          onClick={() => setIsChecked((v) => !v)}
          className={`cursor-pointer text-sm font-medium ${
            isChecked ? 'text-main-red-2' : 'text-gray-400'
          } pl-1 pr-2`}
        >
          익명
        </span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="댓글을 입력하세요."
          disabled={disabled}
          className="focus:outline-none font-normal text-sm placeholder-gray-600 bg-transparent text-white"
        />

        <button type="button" disabled={disabled} onClick={handleSend}>
          <Image src={sendIcon} alt="send" width={20} height={20} className="float-right cursor-pointer" />
        </button>
      </div>
    </section>
  );
}
