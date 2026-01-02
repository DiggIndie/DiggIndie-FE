'use client';
import SearchSection from '@/components/onBoard/SearchSection';
import Image from 'next/image';
import { useState } from 'react';
import { mockConcerts } from '@/mocks/mockConcerts';
import { mockArtists } from '@/mocks/mockArtists';
import back from '@/assets/icons/Arrow-Left.svg';
import PersonalArtistRecCard from '@/components/home/PersonalArtistRecCard';
import PersonalConcertRecCard from '@/components/home/PersonalConcertRecCard';
import mikeIcon from '@/assets/common/Voice 3.svg';
import calendarIcon from '@/assets/common/Calendar.svg';
import documentIcon from '@/assets/sidTab/Document.svg';
import { mockIndieStory } from '@/mocks/mockIndieStory';
import IndieStoryRecard from '@/components/home/IndieStoryRecCard';

export default function HomeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="px-5 py-3 w-full flex gap-1">
        <Image src={back} alt="이전으로" />
        <SearchSection searchTerm={searchTerm} onChange={setSearchTerm} />
      </div>
      <span className="font-medium text-sm text-gray-400 px-5 py-5">검색결과 000개</span>
      <section className="mx-5 mb-9">
        <div className="flex gap-1 mb-4">
          <Image src={mikeIcon} alt="마이크" />
          <span className="text-xl font-semibold text-white">아티스트</span>
          <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
        </div>
        <div className="flex gap-3">
          {mockArtists.map((artist) => (
            <PersonalArtistRecCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
      <section className="mx-5 mb-9">
        <div className="flex gap-1 mb-4">
          <Image src={calendarIcon} alt="달력" />
          <span className="text-xl font-semibold text-white">공연</span>
          <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
        </div>
        <div className="flex gap-3">
          {mockConcerts.map((concert) => (
            <PersonalConcertRecCard key={concert.id} concert={concert} />
          ))}
        </div>
      </section>
      <section className="mx-5 pb-9 ">
        <div className="flex gap-1 mb-4">
          <Image src={documentIcon} alt="문서" />
          <span className="text-xl font-semibold text-white">인디 스토리</span>
          <span className="font-medium text-sm text-white px-2 py-1 ml-2">000개</span>
        </div>
        <div className="flex gap-3">
          {mockIndieStory.map((indieStory) => (
            <IndieStoryRecard key={indieStory.id} indieStory={indieStory} />
          ))}
        </div>
      </section>
    </div>
  );
}
