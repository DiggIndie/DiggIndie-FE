'use client';

import { useParams } from 'next/navigation';
import LinkButton from '@/components/common/LinkButton';
import DetailImgSection from '@/components/detail/DetailImgSection';
import LineupSection from '@/components/detail/LineupSection';
import ConcertContentSection from '@/components/detail/ConcertContentSection';
import ConcertStorySection from '@/components/detail/ConcertStorySection';
import MyHeader from '@/components/my/MyHeader';
import { useEffect, useState } from 'react';
import { getDetailConcerts } from '@/services/concertService';
import { ConcertDetail } from '@/types/concerts';
import { useAuthStore } from '@/stores/authStore';

export default function ConcertDetailPage() {
  const params = useParams<{ concertId: string }>();
  const concertId = Number(params.concertId);
  const [concert, setConcert] = useState<ConcertDetail | null>(null);
  // zustand에서 로그인 상태 구독
  const isLoggedIn = useAuthStore((state) => state.isAuthed);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailConcerts(concertId);
      setConcert(data);
    };

    fetchData();
  }, [concertId]);

  if (!concert) {
    return <div>조회하신 아티스트가 없습니다.</div>;
  }

  return (
    <div className="text-white flex flex-col min-h-screen bg-black relative pb-20 overflow-auto">
      <MyHeader title="" />
      <DetailImgSection imageSrc={concert.imageUrl} />
      <ConcertContentSection isLoggedIn={isLoggedIn} concert={concert} />
      <LineupSection concert={concert} />
      <ConcertStorySection concert={concert} />
      <div className="px-5 pb-5 fixed bottom-0 w-full max-w-94">
        <LinkButton href="">예매하러가기</LinkButton>
      </div>
    </div>
  );
}
