'use client';
import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from './authStore';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/auth/Loading';

//const LOGIN_ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
const allowed = ['kakao', 'google', 'naver'] as const;
type Provider = (typeof allowed)[number];

const isProvider = (x: 'kakao' | 'google' | 'naver'): x is Provider =>
  (allowed as readonly string[]).includes(x as Provider);

export default function LoginCallback() {
  const router = useRouter();
  const { provider } = useParams<{ provider: string }>();
  // URL에서 code 추출
  const code =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('code') : null;
  const state =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('state') : null;

  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    (async () => {
      try {
        if (!provider || !isProvider(provider as string as Provider))
          throw new Error('Invalid provider');
        if (!code) throw new Error('No code');

        // 백엔드 전송을 위해 대문자로 변환 (예: 'kakao' -> 'KAKAO')
        const upperProvider = provider.toUpperCase() as 'KAKAO' | 'GOOGLE' | 'NAVER';

        // const redirectUri = `${LOGIN_ORIGIN}/auth/login/callback/${provider}`;
        // code 교환 요청
        // const uuid = localStorage.getItem('UUID');
        // if (!uuid) throw new Error('Session state (UUID) missing');
        const res = await authService.socialLogin(code, upperProvider, state);

        // 토큰은 Zustand(메모리)에만 저장
        login(res.accessToken, String(res.userId));

        // 플랫폼 정보만 로컬 스토리지에 저장 (UI최근 로그인 표시용)
        localStorage.setItem('recent_provider', res.platform);
        localStorage.removeItem('UUID');

        alert('로그인 성공');
        router.push('/');
      } catch (e) {
        console.error('Login callback error:', e);
        alert('로그인 실패');
        router.push('/auth/login');
      }
    })();
  }, [provider, code, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
}
