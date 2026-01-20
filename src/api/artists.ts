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
  async getDetailArtist(artistId: number): Promise<ApiResponse<ArtistDetail>> {
    const res = await fetchClient<ArtistDetail>(`/artists/${artistId}`, {
      method: 'GET',
      auth: true,
    });
    if (!res) {
      throw new Error('아티스트 상세 응답이 null입니다.');
    }
    return res;
  },

  async toggleScrapArtist(params: { bandIds: number[] }): Promise<void> {
    await fetchClient<void>('/my/artists', {
      method: 'PATCH',
      auth: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bandIds: params.bandIds,
      }),
    });
  },
};
