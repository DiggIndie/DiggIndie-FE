'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/ConcertGrid';
import { mockConcerts } from '@/mocks/mockConcerts';

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date'); // "YYYY-MM-DD" or null

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);

  // 최초 진입/쿼리 변경 시 선택 날짜 세팅
  useEffect(() => {
    if (dateParam) setSelectedDate(dateParam);
  }, [dateParam]);

  const concertsToShow = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const base = !selectedDate ? mockConcerts : mockConcerts.filter((c) => c.date === selectedDate);

    return [...base].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      const aPast = aDate < today;
      const bPast = bDate < today;

      if (aPast !== bPast) return aPast ? 1 : -1;
      if (!aPast) return bDate.getTime() - aDate.getTime();
      return aDate.getTime() - bDate.getTime();
    });
  }, [selectedDate]);

  return (
    <div className="text-white flex flex-col items-center min-h-screen bg-black">
      <CalendarHeader
        isCalendarOpen={showCalendar}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />

      {showCalendar && (
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      )}

      <div className="w-full flex justify-start ml-10">
        <ConcertGrid concerts={concertsToShow} />
      </div>
    </div>
  );
}
