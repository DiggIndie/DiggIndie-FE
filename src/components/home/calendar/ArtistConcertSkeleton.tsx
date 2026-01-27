export default function ArtistConcertSkeleton() {
  return (
    <div className="flex gap-[12px]">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="relative w-[160px] h-[200px] shrink-0 rounded-[8px]
                     overflow-hidden bg-[#1F1D1D] animate-pulse"
        >
          {/* 이미지 영역 */}
          <div className="absolute inset-0 bg-[#2A2A2A]" />

          {/* 어두운 오버레이 느낌 */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  );
}
