import { apiFetch } from '@/api/client';
import { fetchDetailConcert } from '@/api/concert';
import type { ConcertDetail, GetConcertsResponse } from '@/types/concerts';

export type GetConcertsParams = {
  date: string; //YYYY-MM-DD
  page?: number;
  size?: number;
  sort?: string;
  useDevAuth?: boolean;
};

export async function getConcerts(params: GetConcertsParams): Promise<GetConcertsResponse> {
  const { date, page = 0, size = 2, sort, useDevAuth } = params;

  return apiFetch<GetConcertsResponse>('/concerts', {
    query: {
      date,
      page,
      size,
      ...(sort ? { sort } : {}),
    },
    useDevAuth,
  });
}

export async function getDetailConcerts(concertId: number): Promise<ConcertDetail> {
  const res = await fetchDetailConcert({ concertId });
  if (!res) {
    throw new Error('서버 응답이 없습니다.');
  }
  if (!res.isSuccess) {
    throw new Error(res?.message ?? '콘서트 상세 조회 실패');
  }

  return res.payload;
}
