import { KeywordResponse } from '@/types/api';

export const onBoardApi = {
  async getOnboardingKeywords(): Promise<KeywordResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/keywords`, {
      method: 'GET',
    });
    const body = await res.json();
    if (!res.ok || !body.isSuccess) {
      throw new Error(body.message || '키워드 조회 실패');
    }
    return body;
  },
};
