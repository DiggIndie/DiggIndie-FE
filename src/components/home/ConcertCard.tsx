"use client";

import { ImageTile } from "@/components/home/ImageTile";
import { useRouter } from "next/navigation";
import type { ConcertItem } from "@/types/concerts";

type Props = {
  concert: ConcertItem;
};

export default function ConcertCard({ concert }: Props) {
  const router = useRouter();

  const dDay = (concert.dDay ?? "").trim();
  const ended = dDay === "공연 종료";

  return (
    <div
      className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px] cursor-pointer"
      onClick={() => router.push(`/concert/${concert.concertId}`)}
    >
      <div
        className={`relative flex flex-col overflow-x-auto ${
          ended ? "brightness-[0.4]" : ""
        }`}
      >
        <ImageTile
          src={concert.mainImage}
          alt={concert.concertName}
          variant="concertRec"
          className="rounded-t-sm"
          gradient="bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {!ended ? (
          <div className="absolute left-0 right-0 z-10 mt-[134px] text-sm mx-2 flex flex-col">
            <span className="flex w-[41px] h-[17px] bg-[#FF3637] items-center justify-center rounded-xs">
              {dDay}
            </span>

            {/* 공연명 */}
            <span className="text-base mt-1 max-w-[144px] truncate">
              {concert.concertName}
            </span>

            {/* 라인업 */}
            <span className="text-[14px] max-w-[144px] truncate">
              {Array.isArray(concert.lineUp) ? concert.lineUp.join(", ") : ""}
            </span>

            {/* 기간 */}
            <span className="text-sm text-[#8C8888] max-w-[144px] truncate">
              {concert.period}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="text-base font-medium text-white brightness-[1.0]">
              종료된 공연입니다
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
