
import { useRef, useState } from "react";
import type { Artist, PageInfo } from "@/types/artists";
import { getArtistsPage } from "@/services/artistsService";

//페이지당 12개의 아티스트 로드
export function useArtistSearch(pageSize: number = 12) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const isFetchingRef = useRef(false);

  const loadFirstPage = async (query?: string) => {
    isFetchingRef.current = true;
    try {
      const { artists, pageInfo } = await getArtistsPage({ page: 0, size: pageSize, query });
      setArtists(artists);
      setPageInfo(pageInfo);
      setPage(0);
    } catch (e) {
      console.error(e);
      setArtists([]);
      setPageInfo(null);
      setPage(0);
    } finally {
      isFetchingRef.current = false;
    }
  };

  //스크롤시 다음페이지
  const loadNextPage = async () => {
    if (isFetchingRef.current) return;
    if (!pageInfo?.hasNext) return;

    isFetchingRef.current = true;
    const nextPage = page + 1;

    try {
      const { artists: nextArtists, pageInfo: nextPageInfo } = await getArtistsPage({
        page: nextPage,
        size: pageSize,
        query: appliedQuery || undefined,
      });

      setArtists((prev) => {
        const seen = new Set(prev.map((a) => a.bandId));
        const merged = [...prev];
        for (const a of nextArtists) {
          if (!seen.has(a.bandId)) {
            seen.add(a.bandId);
            merged.push(a);
          }
        }
        return merged;
      });

      setPageInfo(nextPageInfo);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      isFetchingRef.current = false;
    }
  };

  //검색창 input 없어질시 다시 원래 표기된 아티스트 로드
  const onChangeSearch = async (value: string) => {
    setSearchTerm(value);
    if (value === "") {
      setAppliedQuery("");
      await loadFirstPage(undefined);
    }
  };

  const onSubmitSearch = async () => {
    const q = searchTerm.trim();
    setAppliedQuery(q);
    await loadFirstPage(q || undefined);
  };

  const onClearSearch = async () => {
    setSearchTerm("");
    setAppliedQuery("");
    await loadFirstPage(undefined);
  };

  return {
    artists,
    pageInfo,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,
  };
}
