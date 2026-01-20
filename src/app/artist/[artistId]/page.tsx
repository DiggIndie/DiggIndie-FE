'use client';
export const dynamic = 'force-dynamic';
//import artistData from '@/mocks/mockArtistDetail.json';
import { useParams } from 'next/navigation';
import DetailImgSection from '@/components/detail/DetailImgSection';
import ArtistContentSection from '@/components/detail/ArtistContentSection';
import ScheduledConcertSection from '@/components/detail/ScheduledConcertSection';
import EndedConcertSection from '@/components/detail/EndConcertSection';
import MyHeader from '@/components/my/MyHeader';
import default_artist_image from '@/assets/detail/artist_default.svg';
import { useEffect, useState } from 'react';
import { getArtistDetail } from '@/services/artistsService';
import { ArtistDetail } from '@/types/artists';
import ArtistDetailSkeleton from '@/components/detail/ArtistDetailSkeleton';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = Number(params.artistId);
  //const artist = artistData.artists.find((a) => a.artistId === bandId);
  const [artist, setArtist] = useState<ArtistDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtist = async () => {
    if (!artistId || Number.isNaN(artistId)) return;
    const res = await getArtistDetail(artistId);
    setArtist(res);
  };
  useEffect(() => {
    if (!artistId || Number.isNaN(artistId)) return;

    const run = async () => {
      setIsLoading(true);
      try {
        await fetchArtist();
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [artistId]);

  const artistImageSrc =
    artist?.artistImage && artist.artistImage.trim() !== ''
      ? artist.artistImage
      : default_artist_image;

  if (isLoading) {
    return <ArtistDetailSkeleton />;
  }
  if (!artist) {
    return <p className="text-white">아티스트를 찾을 수 없습니다.</p>;
  }
  return (
    <div className="text-white flex flex-col min-h-screen">
      <div className="relative">
        <MyHeader title="" />

        <DetailImgSection imageSrc={artistImageSrc} alt={artist.artistName} />
      </div>
      <ArtistContentSection artist={artist} onRefresh={fetchArtist} />
      <ScheduledConcertSection artist={artist} />
      <EndedConcertSection artist={artist} />
    </div>
  );
}
