import { apiFetch, fetchClient } from '@/api/client';
import { ApiResponse } from '@/types/api';
import type { ArtistDetail, OnboardArtistsResponse } from '@/types/artists';

export function fetchArtists(params: { page: number; size: number; query?: string }) {
  return apiFetch<OnboardArtistsResponse>('/artists', {
    method: 'GET',
    query: {
      page: params.page,
      size: params.size,
      ...(params.query ? { query: params.query } : {}),
    },
  });
}

export const artistAPI = {
  async getDetailArtist(artistId: number) {
    return await fetchClient<ApiResponse<ArtistDetail>>(`/artists/${artistId}`, {
      method: 'GET',
      auth: false, // 아티스트 상세페이지는 토큰이 필요 없음
    });
  },
};
