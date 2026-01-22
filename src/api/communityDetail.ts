import { BoardDetail } from '@/types/board';
import { fetchClient } from './client';

export const communityDetailAPI = {
  async fetchCommunityDetail(id: number) {
    return fetchClient<BoardDetail>(`/boards/${id}`, {
      method: 'GET',
      auth: true,
    });
  },
};
