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

  async login(data: { userId: string; password: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok || !body.isSuccess) {
      throw new Error('로그인 실패');
    }

    return body;
  },
  async logout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // refreshToken 쿠키 삭제용
    });

    const body = await res.json();

    if (!res.ok || !body.isSuccess) {
      throw new Error('로그아웃 실패');
    }

    return body;
  },
  async checkId(userId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/exists?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
      }
    );

    const body = await res.json();

    if (!res.ok || !body.isSuccess) {
      throw new Error('아이디 중복체크 실패');
    }

    return body;
  },
};
