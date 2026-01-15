import Image from 'next/image';

interface DetailImgSectionProps {
  imageSrc: string;
  alt?: string;
  onShare?: () => void;
}
export default function DetailImgSection({
  imageSrc,
  alt = 'detail image',
}: DetailImgSectionProps) {
  return (
    <section className="relative">
      <Image
        src={imageSrc}
        alt={alt}
        width={376}
        height={531}
        className="relative flex-shrink-0 w-[376px]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
    </section>
  );
}
