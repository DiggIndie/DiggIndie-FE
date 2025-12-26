'use client'

import CommunityHeader from '@/components/community/CommunityHeader';
import { mockFreeArticles } from "@/mocks/mockFreeArticles";
import FreeArticleList from "@/components/community/FreeArticleList"
import FreeArticleCard from '@/components/community/FreeArticleCard'

export default function CommunityFreePage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <CommunityHeader />


      <FreeArticleList articles={mockFreeArticles} />
    </div>
  );
}