export default function ArtistGridSkeleton() {
  const leftCount = 4;
  const rightCount = 4;

  return (
    <div className="flex justify-start gap-[15px] mt-[16px] animate-pulse">
      {/* left column */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {Array.from({ length: leftCount }).map((_, idx) => (
          <div
            key={`left-${idx}`}
            className="w-[160px] bg-[#1F1D1D] rounded-[4px] overflow-hidden"
          >
            {/* image */}
            <div className="w-full h-[160px] bg-gray-800" />

            {/* text */}
            <div className="px-[12px] py-[10px] flex flex-col gap-[8px]">
              <div className="h-[14px] w-3/4 bg-gray-700 rounded" />
              <div className="h-[12px] w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* right column */}
      <div className="flex flex-col gap-[16px] w-[160px]">
        {Array.from({ length: rightCount }).map((_, idx) => (
          <div
            key={`right-${idx}`}
            className="w-[160px] bg-[#1F1D1D] rounded-[4px] overflow-hidden"
          >
            {/* image */}
            <div className="w-full h-[160px] bg-gray-800" />

            {/* text */}
            <div className="px-[12px] py-[10px] flex flex-col gap-[8px]">
              <div className="h-[14px] w-3/4 bg-gray-700 rounded" />
              <div className="h-[12px] w-1/2 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
