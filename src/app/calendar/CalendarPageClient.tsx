'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/ConcertGrid';
import { mockConcerts } from '@/mocks/mockConcerts';

export default function CalendarPageClient() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date'); // "YYYY-MM-DD" or null

  // []: 전체
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(true);

  // url파라미터가 있을 시 해당 날짜만 선택
  useEffect(() => {
    if (!dateParam) return;
    setSelectedDates([dateParam]);
  }, [dateParam]);

  const concertsToShow = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedSet = new Set(selectedDates);

    const base =
      selectedDates.length === 0
        ? mockConcerts
        : mockConcerts.filter((c) => selectedSet.has(c.date));

    return [...base].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      const aPast = aDate < today;
      const bPast = bDate < today;

      if (aPast !== bPast) return aPast ? 1 : -1; // 예정 먼저
      if (!aPast) return bDate.getTime() - aDate.getTime(); // 예정 가까운 날짜가 위
      return aDate.getTime() - bDate.getTime(); // 종료된 공연: 오래된 날짜가 위
    });
  }, [selectedDates]);

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
        />
      )}

      <div className="w-full flex justify-start ml-10">
        <ConcertGrid concerts={concertsToShow} />
      </div>
    </div>
  );
}
