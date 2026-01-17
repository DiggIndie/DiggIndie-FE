import { fetchClient } from '@/api/client';
import { ApiResponse } from '@/types/api';
import type { ConcertDetail } from '@/types/concerts';

export function fetchDetailConcert(params: {
  concertId: number;
}): Promise<ApiResponse<ConcertDetail> | null> {
  return fetchClient<ConcertDetail>(`/concerts/${params.concertId}`, {
    method: 'GET',
    auth: true,
  });
}
