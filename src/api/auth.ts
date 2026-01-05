import { fetchClient } from './client';

export const authApi = {
  async signup(data: { userId: string; email: string; password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('회원가입 실패');
    }

    return res.json();
  },

  login: (body: { loginId: string; password: string }) =>
    fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  logout: () =>
    fetchClient('/auth/logout', {
      method: 'POST',
      auth: true,
    }),
};
