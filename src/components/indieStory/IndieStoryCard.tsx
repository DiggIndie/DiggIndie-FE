import { ImageTile } from "@/components/home/ImageTile";
import type { MagazineItem } from "@/types/magazine";

type Props = {
  magazine?: MagazineItem | null;
};

export default function MagazineCard({ magazine }: Props) {
  const img = magazine?.imageUrls?.[0] ?? "";
  const externalUrl = magazine?.externalUrl

  return (
    <div className="flex flex-col flex-none w-[160px] bg-[#1F1D1D]">
      <div className="relative flex flex-col">
        <ImageTile
          src={img}
          alt={magazine?.title ?? ""}
          variant="indieStory"
        />
      </div>
    </div>
  );
}
