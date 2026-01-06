import { apiFetch } from "@/api/client";
import type { ArtistsResponse } from "@/types/artists";

export function fetchArtists(params: { page: number; size: number; query?: string }) {
  return apiFetch<ArtistsResponse>("/artists", {
    method: "GET",
    query: {
      page: params.page,
      size: params.size,
      ...(params.query ? { query: params.query } : {}),
    },
  });
}
