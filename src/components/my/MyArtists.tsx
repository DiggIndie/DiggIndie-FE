
import PersonalArtistRecCard from '@/components/home/PersonalArtistRecCard';
import { mockArtists } from '@/mocks/mockArtists';

export default function PersonalConcertRec() {
  const storedArtists = [...mockArtists]

  const leftColumn = storedArtists.filter((_, idx) => idx % 2 === 0);
  const rightColumn = storedArtists.filter((_, idx) => idx % 2 === 1);

  return (
    <section className="w-full flex flex-col overflow-y-auto px-[20px]">
      {/* 2열 카드 영역 */}
      <div className="flex justify-center gap-[16px]">
        {/* 왼쪽 열 */}
        <div className="flex flex-col gap-[20px]">
          {leftColumn.map((artist) => (
            <PersonalArtistRecCard key={artist.id} artist={artist} />
          ))}
        </div>

        {/* 오른쪽 열 */}
        <div className="flex flex-col gap-[20px]">
          {rightColumn.map((artist) => (
            <PersonalArtistRecCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
