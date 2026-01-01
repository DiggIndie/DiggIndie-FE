import Image from "next/image";
import logo from "@/assets/icons/logo.svg"
import search from "@/assets/icons/search.svg"
import hamburger from "@/assets/icons/hamburger.svg"
import backBtn from "@/assets/icons/back.svg"
import calendarIcon from "@/assets/icons/calendarIcon.svg"


import { getThisWeekDates } from "@/hooks/getDay";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function CalendarHeader() {

  const router = useRouter();

  const [weekOffset, setWeekOffset] = useState(0);
  const dates = getThisWeekDates(weekOffset);
  const today = new Date().getDay();
  const initialIndex = today === 0 ? 6 : today - 1; // 월요일: 0 기준으로 보정
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const fullDate = `${dates[selectedIndex].split("-")[0]}년 
                    ${Number(dates[selectedIndex].split("-")[1])}월 
                    ${Number(dates[selectedIndex].split("-")[2])}일`;

  return (
    <div className="flex w-[375px] h-[56px] items-center gap-[88px] bg-black py-[17px]">
      <button onClick={() => router.back()} className={"ml-[20px]"}>
        <Image src={backBtn} alt={"back"} width={24} height={24} />
      </button>
      <span className={"text-[16px] font-semibold text-white"}>
        { fullDate }
      </span>
      <Image src={calendarIcon} alt={"calendar"} />
    </div>
  );
}
