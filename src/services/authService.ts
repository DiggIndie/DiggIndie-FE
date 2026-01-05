import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';

export const authService = {
  async signup(id: string, password: string, emailLocal: string, emailDomain: string) {
    const email = `${emailLocal}${emailDomain}`;
    try {
      const res = await authApi.signup({ userId: id, email, password });
      console.log('[signup] 응답 성공', res.payload);

      //자동 로그인
      const { accessToken, userId } = res.payload;
      useAuthStore.getState().login(accessToken, userId);

      return res;
    } catch (err) {
      console.error('[signup] 실패', err);
      throw err;
    }
  },

  async login(userId: string, password: string) {
    try {
      const res = await authApi.login({ userId, password });
      const { accessToken, userId: responseUserId } = res.payload;
      useAuthStore.getState().login(accessToken, responseUserId);
      console.log('login 성공', res.payload);
      return res;
    } catch (err) {
      console.log('login 실패', err);
      throw err;
    }
  },

  logout() {
    useAuthStore.getState().logout();
  },
};
