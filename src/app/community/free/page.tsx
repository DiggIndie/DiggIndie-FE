'use client';
import CommunityHeader from '@/components/community/CommunityHeader';
import { useRouter } from 'next/navigation';

export default function CommunityFreePage() {
  const router = useRouter();
  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <CommunityHeader />
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center bg-black">
          <div onClick={() => router.push('/community/free/1')}>상세페이지로 </div>
        </main>
      </div>
    </div>
  );
}
