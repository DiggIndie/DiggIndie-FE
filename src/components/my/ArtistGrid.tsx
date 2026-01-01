"use client";

import { useMemo } from "react";
import ArtistCard from "@/components/home/ArtistCard";
import type { Artist } from "@/types/artists";

type Props = {
  artists: Artist[];
};

export default function ArtistGrid({ artists }: Props) {
  const leftColumn = useMemo(
    () => artists.filter((_, idx) => idx % 2 === 0),
    [artists]
  );
  const rightColumn = useMemo(
    () => artists.filter((_, idx) => idx % 2 === 1),
    [artists]
  );

  return (
    <div className="flex justify-center gap-[15px] mt-[16px]">
      <div className="flex flex-col gap-[16px]">
        {leftColumn.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      <div className="flex flex-col gap-[16px]">
        {rightColumn.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
