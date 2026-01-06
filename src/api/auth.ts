import { fetchClient } from './client';

export const authApi = {
  async signup(data: { userId: string; email: string; password: string }) {
    return await fetchClient<{ accessToken: string; userId: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false, // 회원가입 시에는 토큰이 필요 없음
    });
  },

  async login(data: { userId: string; password: string }) {
    return await fetchClient<{ accessToken: string; userId: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false,
    });
  },

  async logout() {
    return await fetchClient<void>('/auth/logout', {
      method: 'POST',
      auth: true,
    });
  },
  async checkId(userId: string) {
    return await fetchClient<{ isAvailable: boolean }>(
      `/auth/exists?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        auth: false,
      }
    );
  },
};
