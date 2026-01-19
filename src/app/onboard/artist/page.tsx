'use client';

import Header from '@/components/onBoard/Header';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';
import ProgressBar from '@/components/onBoard/ProgressBar';
import ArtisItem from '@/components/onBoard/ArtistItem';
import NoResult from '@/components/onBoard/NoResult';
import LinkButton from '@/components/common/LinkButton';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Artist } from '@/types/artists';
import { saveSelectedArtists } from '@/services/artistsService';
import { useArtistSearch } from '@/hooks/useArtistSearch';
import { onBoardKeywordService } from '@/services/onBoardKeyword.service';
import ArtistSkeletonGrid from '@/components/onBoard/ArtistSkeleton';

export default function OnboardArtistPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    artists,
    searchTerm,
    loading,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,
  } = useArtistSearch(12);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      await loadNextPage();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadNextPage]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    //온보딩 때 선택했던 아티스트 불러오기
    const fetchSelectedArtists = async () => {
      const res = await onBoardKeywordService.getSelectedArtists();
      setSelectedIds(res.bands.map((item: Artist) => item.bandId));
    };

    void fetchSelectedArtists();
  }, []);
  const handleComplete = async () => {
    if (selectedIds.length < 2) return;

    //선택한 아티스트 저장
    await saveSelectedArtists(selectedIds);
    router.push('/onboard/genre');
  };

  useEffect(() => {
    loadFirstPage();
  }, []);
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
          min="최소 2팀"
        />

        <div className="px-5 pt-5">
          <SearchSection
            searchTerm={searchTerm}
            onChange={onChangeSearch}
            onClear={onClearSearch}
            onSubmit={onSubmitSearch}
          />
        </div>

        {loading && artists.length === 0 ? (
          <ArtistSkeletonGrid />
        ) : artists.length > 0 ? (
          <div className="overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4 px-5 pt-5">
            {artists.map((artist: Artist) => (
              <ArtisItem
                key={artist.bandId}
                artist={artist}
                isSelected={selectedIds.includes(artist.bandId)}
                toggleSelect={toggleSelect}
              />
            ))}
            <div ref={sentinelRef} className="col-span-3 h-1" />
          </div>
        ) : (
          <NoResult />
        )}
      </div>

      <div className="px-5 mb-5">
        <LinkButton
          href="/onboard/genre"
          disabled={selectedIds.length < 2}
          onClick={handleComplete}
        >
          선택완료
        </LinkButton>
      </div>
    </div>
  );
}
