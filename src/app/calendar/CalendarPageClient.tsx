'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/ConcertGrid';
import SearchCardSkeleton from '@/components/search/SearchCardSkeleton';

import { useCalendarConcerts } from '@/hooks/useCalendarConcerts';
import { useMonthConcerts } from '@/hooks/useMonthConcerts';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function CalendarPageClient() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);

  // 현재 캘린더의 월
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth() + 1); // 1~12

  // url파라미터가 있을 시 해당 날짜만 선택
  useEffect(() => {
    if (!dateParam) return;
    setSelectedDates([dateParam]);
  }, [dateParam]);

  // 선택된 날짜가 없을 때 월별 hasConcert 조회
  const monthEnabled = selectedDates.length === 0;

  const { data: monthData, isLoading: isMonthLoading } = useMonthConcerts({
    year: viewYear,
    month: viewMonth,
    enabled: monthEnabled,
  });

  // API 호출용
  const fetchDates = useMemo((): string[] | null => {
    if (selectedDates.length > 0) return selectedDates;

    if (!monthData) return null;

    const days = monthData.days ?? [];
    const concertDays = days.filter((d) => d.hasConcert).map((d) => d.day);

    return concertDays.map((day) => `${viewYear}-${pad2(viewMonth)}-${pad2(day)}`);
  }, [selectedDates, monthData, viewYear, viewMonth]);

  //로드할 콘서트
  const concertsEnabled =
    selectedDates.length > 0 || (fetchDates !== null && fetchDates.length > 0);

  const { concerts, isLoading: isConcertLoading } = useCalendarConcerts({
    dates: fetchDates ?? [],
    page: 0,
    size: 20,
    enabled: concertsEnabled,
  });

  // 선택 날짜 있음: 그날만, 없음: 월별 콘서트
  const isLoading =
    selectedDates.length > 0
      ? isConcertLoading
      : isMonthLoading || (concertsEnabled ? isConcertLoading : false);

  const concertsToShow = useMemo(() => {
    const base = concerts ?? [];

    return [...base].sort((a, b) => {
      const aEnded = a.dDay === '공연 종료';
      const bEnded = b.dDay === '공연 종료';

      if (aEnded && !bEnded) return 1;
      if (!aEnded && bEnded) return -1;
      return 0;
    });
  }, [concerts]);

  const noConcertsToday =
    !isLoading &&
    (selectedDates.length > 0
      ? concertsToShow.length === 0 :
      fetchDates !== null && (fetchDates.length === 0 || concertsToShow.length === 0));

  return (
    <div className="text-white flex flex-col items-center min-h-screen bg-black">
      <CalendarHeader
        isCalendarOpen={showCalendar}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <Calendar
          selectedDates={selectedDates}
          onChangeSelectedDates={setSelectedDates}
          onMonthChange={(y, m) => {
            setViewYear(y);
            setViewMonth(m);
          }}
        />
      )}

      <div className="w-full w-max-[375px] h-[40px] mt-3 flex px-5 py-2">
        {selectedDates[0] && (
          <div className="text-[#BEBABA] text-[16px] font-medium">
            {selectedDates[0].slice(0, 4)}년{' '}
            {selectedDates[0].slice(5, 7)}월{' '}
            {selectedDates[0].slice(8, 10)}일
          </div>
        )}
      </div>

      <div className="w-full flex justify-start ml-10">
        {noConcertsToday ? (
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
