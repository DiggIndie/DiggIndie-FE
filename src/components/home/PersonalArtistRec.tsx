import MockArtistCard from '@/components/home/MockArtistCard';
import { mockArtists } from '@/mocks/mockArtists';

type Props = {
  isLoggedIn: boolean;
};

export default function PersonalArtistRec({ isLoggedIn }: Props) {
  return (
    <section className="mt-[24px] w-full max-w-[375px] min-h-[257px] bg-black flex flex-col">
      <div className="mx-[20px] mb-[16px] flex items-center">
        <span className="text-[20px] font-semibold mr-[4px] truncate">
          리스너님을 위한 추천 아티스트
        </span>
      </div>

      <div className={`flex overflow-x-auto ml-[20px] ${!isLoggedIn ? 'blur-sm' : 'blur-none'}`}>
        <div className="flex gap-[16px] w-max pr-[20px]">
          {mockArtists.map((artist) => (
            <MockArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
