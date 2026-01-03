'use client'

import AuthFindHeader from "@/components/auth/AuthFindHeader";
import FindPwResult from '@/components/auth/FindPwResult';

export default function ResetPwResultPage() {

  return (
    <div className="text-white flex flex-col h-screen bg-black">
      <div className="flex flex-col">
        <div className={"sticky top-0 z-5"}>
          <AuthFindHeader title={"비밀번호 재설정"}/>
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto bg-black">
          <FindPwResult />
        </div>
      </div>
    </div>
  );
}
