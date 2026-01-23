import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from './authStore';

const LOGIN_ORIGIN = import.meta.env.VITE_ORIGIN;
const allowed = ['kakao', 'google'] as const;
type Provider = (typeof allowed)[number];

const isProvider = (x: string): x is Provider =>
  (allowed as readonly string[]).includes(x as Provider);

export default function LoginCallback() {
  const nav = useNavigate();
  const { provider } = useParams<{ provider: string }>();
  const code = new URL(window.location.href).searchParams.get('code');
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    (async () => {
      try {
        if (!provider || !isProvider(provider)) throw new Error('Invalid provider');
        if (!code) throw new Error('No code');

        const redirectUri = `${LOGIN_ORIGIN}/login/callback/${provider}`;

        // code 교환 요청
        const res = await authService.loginWithCode(provider, code, redirectUri);

        login(res.accessToken, {
          id: String(res.id),
          email: res.email,
          name: res.name,
        });
        alert('로그인 성공');
        nav('/', { replace: true });
      } catch (e) {
        console.error('Login callback error:', e);
        alert('로그인 실패');
        nav('/login', { replace: true });
      }
    })();
  }, [provider, code, login, nav]);

  return null;
}
