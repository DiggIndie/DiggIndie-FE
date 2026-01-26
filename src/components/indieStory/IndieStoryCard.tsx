import { ImageTile } from "@/components/home/ImageTile";
import type { MagazineItem } from "@/types/magazine";

type Props = {
  magazine?: MagazineItem | null;
};

export default function MagazineCard({ magazine }: Props) {
  const img = magazine?.imageUrls?.[0] ?? "";

  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D] rounded-b-[4px]">
      <div className="relative flex flex-col">
        <ImageTile
          src={img}
          alt={magazine?.title ?? ""}
          variant="indieStory"
          className="rounded-[4px]"
        />
      </div>
    </div>
  );
}
