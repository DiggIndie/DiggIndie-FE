'use client';

import HomeHeader from '@/components/home/HomeHeader';
import LoginBanner from '@/components/home/LoginBanner';
import PersonalArtistRec from '@/components/home/PersonalArtistRec';
import HomeCalendar from '@/components/home/HomeCalendar';
import PersonalConcertRec from '@/components/home/PersonalConcertRec';
import IndieStoryRec from '@/components/home/IndieStoryRec';
import ResetPreference from '@/components/home/ResetPreference';
import Popular from '@/components/home/Popular';

import { useEffect, useState } from 'react';
import SideTab from '@/components/sideTabDir/SideTab';
import { useAuthStore } from '@/stores/authStore';
import Feedback from '@/components/home/Feedback';
import { authService } from '@/services/authService';

export default function HomePage() {
  const { isAuthed } = useAuthStore();
  const userId = useAuthStore((s) => s.userId);
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSideTabOpen ? 'hidden' : 'auto';
  }, [isSideTabOpen]);

  useEffect(() => {
    const fetchIdIfNeeded = async () => {
      // 로그인은 되어 있는데 스토어에 userId가 없다면 (새로고침 상황 등)
      if (isAuthed && !userId) {
        try {
          await authService.getUserId();
        } catch (error) {
          console.error('사용자 정보를 가져오는 데 실패했습니다.');
        }
      }
    };
  });
  return (
    <div className="text-white min-h-screen bg-black relative">
      <div className="flex flex-col">
        <main className="flex flex-col items-center bg-black pb-20">
          <HomeHeader onHamburgerClick={() => setIsSideTabOpen(true)} userId={userId} />
          <IndieStoryRec />
          <div className="px-5 w-full">
            <LoginBanner isLoggedIn={isAuthed} />
          </div>
          <PersonalArtistRec isLoggedIn={isAuthed} />
          <PersonalConcertRec isLoggedIn={isAuthed} />
          <ResetPreference isLoggedIn={isAuthed} />
          <Feedback isLoggedIn={isAuthed} />
          <HomeCalendar />
          <Popular />
        </main>
      </div>
      {isSideTabOpen && <SideTab onClose={() => setIsSideTabOpen(false)} />}
    </div>
  );
}
