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
    <section className="relative w-full h-[425px] ">
      <Image src={imageSrc} alt={alt} fill className="object-cover" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent " />
    </section>
  );
}
