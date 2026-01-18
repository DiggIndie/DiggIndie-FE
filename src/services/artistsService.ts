import { fetchArtists } from "@/api/artists";
import { postOnboardArtist } from "@/api/onboardArtists";
import type { OnboardArtist, PageInfo } from "@/types/artists";

export async function getOnboardingArtists(): Promise<{
  artists: OnboardArtist[];
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

export async function getArtistsPage(params: {
  page: number;
  size: number;
  query?: string;
}): Promise<{ artists: OnboardArtist[]; pageInfo: PageInfo }> {
  const res = await fetchArtists(params);

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch artists");
  }

  return { artists: res.payload, pageInfo: res.pageInfo };
}

export async function saveSelectedArtists(bandIds: number[]): Promise<void> {
  const res = await postOnboardArtist(bandIds);
  if (!res.isSuccess) throw new Error(res.message || "Failed to save artists");
}