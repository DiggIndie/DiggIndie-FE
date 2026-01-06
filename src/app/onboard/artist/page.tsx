'use client';
import Header from '@/components/onBoard/Header';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';
import ProgressBar from '@/components/onBoard/ProgressBar';
import ArtisItem from '@/components/onBoard/ArtistItem';
import NoResult from '@/components/onBoard/NoResult';
import { useEffect, useRef, useState } from 'react';
import LinkButton from '@/components/common/LinkButton';

import type { Artist, PageInfo } from '@/types/artists';
import { getArtistsPage } from '@/services/artistsService';

export default function OnboardArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(0);
  const isFetchingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isFetchingRef.current = true;
    getArtistsPage({ page: 0, size: 12 })
      .then(({ artists, pageInfo }) => {
        setArtists(artists);
        setPageInfo(pageInfo);
        setPage(0);
      })
      .catch((e) => {
        console.error(e);
        setArtists([]);
        setPageInfo(null);
      })
      .finally(() => {
        isFetchingRef.current = false;
      });
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      if (isFetchingRef.current) return;
      if (!pageInfo?.hasNext) return;

      isFetchingRef.current = true;
      const nextPage = page + 1;

      try {
        const { artists: nextArtists, pageInfo: nextPageInfo } = await getArtistsPage({
          page: nextPage,
          size: 12,
        });

        setArtists((prev) => {
          const seen = new Set(prev.map((a) => a.bandId));
          const merged = [...prev];
          for (const a of nextArtists) {
            //중복되는 아티스트 표기 방지
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
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [page, pageInfo]);

  /*장르 선택 함수  */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  //검색어 필터링
  const filteredArtists = artists.filter((artist) =>
    artist.bandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="px-5 pb-5">
          <ProgressBar current={1} total={3} />
        </div>
        <TitleSection
          title={
            <>
              좋아하는
              <br /> 아티스트를 알려주세요
            </>
          }
          min="최소 2"
        />
        <div className="px-5 pt-5">
          <SearchSection searchTerm={searchTerm} onChange={setSearchTerm} onSubmit={() => {}} />
        </div>
        <div className="overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4 px-5 pt-5">
          {filteredArtists.length > 0 ? (
            <>
              {filteredArtists.map((artist) => (
                <ArtisItem
                  key={artist.bandId}
                  artist={artist}
                  isSelected={selectedIds.includes(artist.bandId)}
                  toggleSelect={toggleSelect}
                />
              ))}
              <div ref={sentinelRef} className="col-span-3 h-1" />
            </>
          ) : (
            <NoResult />
          )}
        </div>
      </div>
      <div className="px-5 pb-5">
        <LinkButton href="/onboard/genre" disabled={selectedIds.length < 2}>
          선택완료
        </LinkButton>
      </div>
    </div>
  );
}
