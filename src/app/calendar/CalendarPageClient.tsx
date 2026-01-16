'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/ConcertGrid';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';

import { useCalendarConcerts } from '@/hooks/useCalendarConcerts';

export default function CalendarPageClient() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);

  // url파라미터가 있을 시 해당 날짜만 선택
  useEffect(() => {
    if (!dateParam) return;
    setSelectedDates([dateParam]);
  }, [dateParam]);

  const { concerts, isLoading } = useCalendarConcerts({
    dates: selectedDates,
    page: 0,
    size: 20,
    enabled: true,
  });

  const concertsToShow = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const base = concerts;

    return [...base].sort((a, b) => {
      const aEnded = a.dDay === '공연 종료';
      const bEnded = b.dDay === '공연 종료';

      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      return 0;
    });
  }, [concerts]);

  return (
    <div className="text-white flex flex-col items-center min-h-screen bg-black">
      <CalendarHeader
        isCalendarOpen={showCalendar}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <Calendar selectedDates={selectedDates} onChangeSelectedDates={setSelectedDates} />
      )}

      <div className="w-full w-max-[375px] h-[40px] mt-3 flex px-5 py-2">
        {selectedDates[0] && (
          <div className="text-[#BEBABA] text-[16px] font-medium">
            {selectedDates[0].slice(0, 4)}년{" "}
            {selectedDates[0].slice(5, 7)}월{" "}
            {selectedDates[0].slice(8, 10)}일
          </div>
        )}
      </div>
      <div className="w-full flex justify-start ml-10">
        {isLoading ? (
          <SearchCardSkeleton />
        ) : concertsToShow.length === 0 ? (
          <div
            className="w-full max-w-[335px] h-[44px] bg-[#1F1D1D] border-[1px] border-[#413D3D]
            rounded-[4px] font-medium text-[14px] text-[#8C8888] px-4 flex items-center"
          >
            금일 예정된 공연은 없습니다
          </div>
        ) : (
          <ConcertGrid concerts={concertsToShow} />
        )}
      </div>
    </div>
  );
}
