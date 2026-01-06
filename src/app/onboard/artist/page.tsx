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

export default function OnboardArtistPage() {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    artists,
    pageInfo,
    searchTerm,
    onChangeSearch,
    onSubmitSearch,
    onClearSearch,
    loadFirstPage,
    loadNextPage,
  } = useArtistSearch(12);

  useEffect(() => {
    void loadFirstPage(undefined);
  }, []);

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
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
  };

  //선택 완료 후 온보딩/장르로 넘어가기 전 저장
  const handleSaveAndGo = async () => {
    if (selectedIds.length < 2) return;
    if (isSaving) return;

    setIsSaving(true);

    try {
      await saveSelectedArtists(selectedIds);
      router.push('/onboard/genre');
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : '저장 실패');
    } finally {
      setIsSaving(false);
    }
  };

  const interceptLinkClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIds.length < 2 || isSaving) {
      e.preventDefault();
      return;
    }

    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    e.preventDefault();
    e.stopPropagation();
    void handleSaveAndGo();
  };

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
          <SearchSection
            searchTerm={searchTerm}
            onChange={onChangeSearch}
            onClear={onClearSearch}
            onSubmit={onSubmitSearch}
          />
        </div>

        <div className="overflow-y-scroll scroll-hidden grid grid-cols-3 gap-4 px-5 pt-5">
          {artists.length > 0 ? (
            <>
              {artists.map((artist: Artist) => (
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

      <div className="px-5 pb-5" onClickCapture={interceptLinkClickCapture}>
        <LinkButton href="/onboard/genre" disabled={selectedIds.length < 2 || isSaving}>
          선택완료
        </LinkButton>
      </div>
    </div>
  );
}
