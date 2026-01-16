'use client';
import artistData from '@/mocks/mockArtistDetail.json';
import { useParams } from 'next/navigation';
import DetailImgSection from '@/components/detail/DetailImgSection';
import ArtistContentSection from '@/components/detail/ArtistContentSection';
import ScheduledConcertSection from '@/components/detail/ScheduledConcertSection';
import EndedConcertSection from '@/components/detail/EndConcertSection';
import MyHeader from '@/components/my/MyHeader';
import default_artist_image from '@/assets/detail/artist_default.svg';

export default function ArtistDetailPage() {
  const params = useParams();
  const artistId = Number(params.artistId);
  const artist = artistData.artists.find((a) => a.artistId === artistId);
  if (!artist) {
    return <p className="text-white">아티스트를 찾을 수 없습니다.</p>;
  }
  const artistImageSrc =
    artist.artistImage && artist.artistImage.trim() !== ''
      ? artist.artistImage
      : default_artist_image;
  return (
    <div className="text-white flex flex-col min-h-screen">
      <div className="relative">
        <MyHeader title="" />

        <DetailImgSection imageSrc={artistImageSrc} alt={artist.artistName} />
      </div>
      <ArtistContentSection artist={artist} />
      <ScheduledConcertSection artist={artist} />
      <EndedConcertSection artist={artist} />
    </div>
  );
}
