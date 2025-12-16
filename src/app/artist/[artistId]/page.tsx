import Image from 'next/image';
import artistData from '@/mocks/mockArtistDetail.json';

export default function ArtistDetailPage() {
  return (
    <div className="text-white flex flex-col h-screen">
      <Image
        src={artistData.artists[0].image}
        alt="Artist Image"
        width={376}
        height={531}
        className="py-[18px] px-[19px]"
      />
    </div>
  );
}
