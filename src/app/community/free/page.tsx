'use client'

import CommunityHeader from '@/components/community/CommunityHeader';
import { mockFreeArticles } from "@/mocks/mockFreeArticles";
import ArticleList from "@/components/community/ArticleList"


export default function CommunityFreePage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <CommunityHeader />
        </div>
        <main className="overflow-y-auto scrollbar flex flex-col justify-center items-center bg-black">
          <ArticleList articles={mockFreeArticles} />
        </main>
      </div>
    </div>
  );
}
