import Image from 'next/image';
import { DEFAULT_DETAIL_IMAGE, DetailImageVariant } from '@/assets/detail/Defulat-Image';

interface DetailImgSectionProps {
  imageSrc?: string;
  variant: DetailImageVariant;
  alt?: string;
  onShare?: () => void;
}
export default function DetailImgSection({
  imageSrc,
  variant,
  alt = 'detail image',
}: DetailImgSectionProps) {
  const isDefaultImage = !imageSrc || imageSrc.trim() === '';
  const resolvedImage = imageSrc || DEFAULT_DETAIL_IMAGE[variant];

  return (
    <section className="relative">
      <Image src={resolvedImage} alt={alt} width={376} height={531} className="relative" />
      {!isDefaultImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
      )}
    </section>
  );
}
