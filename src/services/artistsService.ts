// src/services/artistsService.ts
import { fetchArtists } from "@/api/artists";
import type { Artist, PageInfo } from "@/types/artists";

export async function getOnboardingArtists(): Promise<{
  artists: Artist[];
  pageInfo: PageInfo;
}> {
  const res = await fetchArtists({ page: 0, size: 12 });

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch artists");
  }

  return {
    artists: res.payload,
    pageInfo: res.pageInfo,
  };
}


//온보딩 페이지 아래 스크롤시 새로 요청
export async function getArtistsPage(params: { page: number; size: number; query?: string }): Promise<{
  artists: Artist[];
  pageInfo: PageInfo;
}> {
  const res = await fetchArtists(params);

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch artists");
  }

  return {
    artists: res.payload,
    pageInfo: res.pageInfo,
  };
}