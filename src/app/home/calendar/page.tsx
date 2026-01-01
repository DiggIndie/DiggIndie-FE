'use client'

import { useState, useMemo } from "react";
import CalendarHeader from "@/components/home/calendar/CalendarHeader";
import Calendar from "@/components/home/calendar/Calendar";
import ConcertGrid from "@/components/my/ConcertGrid";
import { mockConcerts } from "@/mocks/mockConcerts";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const concertsByDate = useMemo(() => {
    if (!selectedDate) return [];
    return mockConcerts.filter(
      (concert) => concert.date === selectedDate
    );
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <CalendarHeader />

      <Calendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {selectedDate && (
        <div className="w-full mt-[24px]">
          <ConcertGrid concerts={concertsByDate} />
        </div>
      )}
    </div>
  );
}
