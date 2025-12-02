import Header from '@/components/onBoard/Header';
import Button from '@/components/onBoard/Button';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';
import ProgressBar from '@/components/onBoard/ProgressBar';
import ArtistList from '@/components/onBoard/ArtistList';
//import { useState } from 'react';

export default function OnboardArtistPage() {
  // const [selectedArtists, setSelectedArtists] = useState<number[]>([]);

  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto m-5 gap-5 flex flex-col">
        <ProgressBar current={1} total={3} />

        <TitleSection
          title={
            <>
              좋아하는
              <br /> 아티스트를 알려주세요
            </>
          }
          min="최소 2개"
        />
        <SearchSection />
        <div className="overflow-y-scroll scroll-hidden">
          <ArtistList />
        </div>
      </div>
      <div className="p-5 bg-transparent">
        <Button href="/onboard/genre" bgColor="bg-red">
          선택완료
        </Button>
      </div>
    </div>
  );
}
