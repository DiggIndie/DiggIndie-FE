import Header from '@/components/onBoard/Header';
import Button from '@/components/onBoard/Button';
import TitleSection from '@/components/onBoard/TitleSection';
import SearchSection from '@/components/onBoard/SearchSection';

export default function OnboardArtistPage() {
  return (
    <div className="bg-black text-white flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto m-5 gap-5 flex flex-col">
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
        <div>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
          <p className="font-bold">dddddd</p>
        </div>
      </div>
      <div className="mx-5 mb-5">
        <Button href="/onboard/genre" bgColor="bg-red">
          선택완료
        </Button>
      </div>
    </div>
  );
}
