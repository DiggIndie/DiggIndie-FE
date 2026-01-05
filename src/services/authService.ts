import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';

export const authService = {
  async signup(id: string, password: string, emailLocal: string, emailDomain: string) {
    const email = `${emailLocal}${emailDomain}`;
    try {
      const res = await authApi.signup({ userId: id, email, password });
      console.log('[signup] 응답 성공', res);
      return res;
    } catch (err) {
      console.error('[signup] 실패', err);
      throw err;
    }
  },

  //   async login(loginId: string, password: string) {
  //     const res = await authApi.login({ loginId, password });
  //     useAuthStore.getState().login(res.payload.accessToken);
  //     return res;
  //   },

  logout() {
    useAuthStore.getState().logout();
  },
};
