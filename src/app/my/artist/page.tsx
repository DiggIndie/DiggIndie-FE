'use client'

import MyHeader from "@/components/my/MyHeader";
import MyArtists from '@/components/my/MyArtists';

export default function MyArtistPage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <MyHeader title={"스크랩한 아티스트"}/>
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto bg-black">
          <MyArtists />
        </div>
      </div>
    </div>
  );
}
