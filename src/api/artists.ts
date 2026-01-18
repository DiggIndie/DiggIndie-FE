import { apiFetch, fetchClient } from '@/api/client';
import type { ApiResponse } from '@/types/api';
import type {
  OnboardArtistsResponse,
  ArtistPayload,
  GetArtistsParams,
  GetMyArtistsParams,
  MyArtistsResult,
  MyArtistsItem,
  PageInfo
} from '@/types/artists';

export function fetchArtists(params: { page: number; size: number; query?: string }) {
  return apiFetch<OnboardArtistsResponse>("/artists", {
    method: "GET",
    query: {
      page: params.page,
      size: params.size,
      ...(params.query ? { query: params.query } : {}),
    },
  });
}

//공연 검색 용
export async function getArtists(params: GetArtistsParams = {}): Promise<ArtistPayload> {
  const { order = "recent", query = "", page = 0, size = 20 } = params;

  const sp = new URLSearchParams({
    order,
    query,
    page: String(page),
    size: String(size),
  });

  const res = await fetchClient<ArtistPayload>(`/artists/search?${sp.toString()}`, {
    method: "GET",
    auth: true,
  });

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch artists");
  }

  return (
    res.payload ?? {
      artists: [],
      pageInfo: {
        page,
        size,
        hasNext: false,
        totalElements: 0,
        totalPages: 0,
      },
    }
  );
}



// 마이 아티스트 조회
type MyArtistsRawResponse = ApiResponse<MyArtistsItem[]> & {
  pageInfo?: PageInfo;
};

export async function getMyArtists(params: GetMyArtistsParams = {}): Promise<MyArtistsResult> {
  const { page = 0, size = 20 } = params;

  const sp = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const res = (await fetchClient<MyArtistsItem[]>(`/my/artists?${sp.toString()}`, {
    method: "GET",
    auth: true,
  })) as MyArtistsRawResponse;

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch my artists");
  }

  return {
    artists: res.payload ?? [],
    pageInfo:
      res.pageInfo ?? {
        page,
        size,
        hasNext: false,
        totalElements: 0,
        totalPages: 0,
      },
  };
}