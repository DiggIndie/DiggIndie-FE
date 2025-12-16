import PersonalConcertRecCard, {
  daysUntilConcert,
} from '@/components/home/PersonalConcertRecCard';
import { mockConcerts } from '@/mocks/mockConcerts';

export default function PersonalConcertRec() {
  const sortedConcerts = [...mockConcerts].sort(
    (a, b) => daysUntilConcert(b.date) - daysUntilConcert(a.date)
  );

  const leftColumn = sortedConcerts.filter((_, idx) => idx % 2 === 0);
  const rightColumn = sortedConcerts.filter((_, idx) => idx % 2 === 1);

  return (
    <section className="w-full flex flex-col overflow-y-auto px-[20px]">
      {/* 2열 카드 영역 */}
      <div className="flex justify-center gap-[16px]">
        {/* 왼쪽 열 */}
        <div className="flex flex-col gap-[20px]">
          {leftColumn.map((concert) => (
            <PersonalConcertRecCard key={concert.id} concert={concert} />
          ))}
        </div>

        {/* 오른쪽 열 */}
        <div className="flex flex-col gap-[20px]">
          {rightColumn.map((concert) => (
            <PersonalConcertRecCard key={concert.id} concert={concert} />
          ))}
        </div>
      </div>
    </section>
  );
}
