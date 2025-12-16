import Image from 'next/image';
import share from '@/assets/common/share.svg';
import concertData from '@/mocks/mockConcertDetail.json';
import bookmark from '@/assets/detail/bookMark.svg';
import Calendar from '@/assets/common/Calendar.svg';
import ticket from '@/assets/common/ticket.svg';
import location from '@/assets/detail/Location.svg';
import LinkButton from '@/components/common/LinkButton';
import lineup from '@/assets/common/Profile.svg';
import paper from '@/assets/detail/Paper.svg';

export default function ConcertDetailPage() {
  return (
    <div className="text-white flex flex-col min-h-screen bg-black">
      <section className="relative">
        <Image
          src={concertData.concerts[0].mainImage}
          alt="Artist Image"
          width={376}
          height={531}
          className="relative py-[18px] px-[19px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
        <Image
          src={share}
          alt="share"
          width={24}
          height={24}
          className="absolute bottom-[18px] right-[18px] cursor-pointer"
        />
      </section>
      <section className="px-5 pt-5 pb-7 border-b-4 border-gray-800">
        <p className="flex justify-between items-center gap-6">
          <span className="font-semibold text-xl">{concertData.concerts[0].concertName}</span>
          <Image src={bookmark} alt="bookmark" width={24} height={24} className="cursor-pointer" />
        </p>
        <p className="flex gap-2 pb-3 border-b border-gray-850">
          <Image src={Calendar} alt="calendar" width={24} height={24} />
          <span className="text-white text-xl font-medium">
            {concertData.concerts[0].startDate}
          </span>
        </p>
        <p className="flex gap-2 items-center py-3 pb-3 border-b border-gray-850 mb-3 items-start">
          <Image src={location} alt="location" width={24} height={24} />
          <p className="flex flex-col">
            <span className="font-medium text-base">{concertData.concerts[0].concertHallName}</span>
            <span className="font-normal text-sm text-gray-500">
              {concertData.concerts[0].address}
            </span>
          </p>
        </p>
        <div className="flex gap-2 items-start">
          <Image src={ticket} alt="ticket" width={24} height={24} />
          <div>
            <p className="flex gap-1 items-end">
              <span className="font-normal text-base text-white">
                {concertData.concerts[0].onSite}원
              </span>
              <span className="text-gray-500 text-xs ">현장예매</span>
            </p>
            <p className="flex gap-1 items-end">
              <span className="font-normal text-base text-white">
                {concertData.concerts[0].preorderPrice}원
              </span>
              <span className="text-gray-500 text-xs">사전예매</span>
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col px-5 py-2 gap-4 my-6">
        <p className="flex gap-2">
          <Image src={lineup} alt="lineup" width={24} height={24} />
          <span className="font-medium text-base">라인업</span>
        </p>
        <p>
          {concertData.concerts[0].lineUp.map((artist) => (
            <span key={artist.artistId} className="font-medium text-sm mr-4">
              {artist.artistName}
            </span>
          ))}
        </p>
      </section>
      <section className="px-5 gap-2 mb-10">
        <p className="flex gap-2">
          <Image src={paper} alt="paper" width={24} height={24} />
          <span>공연 스토리</span>
        </p>
        <p className="py-3 text-gray-500 font-medium text-sm">
          {concertData.concerts[0].description}
        </p>
      </section>
      <div className="p-5">
        <LinkButton href="#">예매하러가기</LinkButton>
      </div>
    </div>
  );
}
