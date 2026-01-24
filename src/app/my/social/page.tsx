'use client';
import MyHeader from '@/components/my/MyHeader';
import Image from 'next/image';
import google from '@/assets/auth/google.svg';
import naver from '@/assets/auth/naver.svg';
import kakao from '@/assets/auth/kakao.svg';
import { ToggleSwitch } from '@/components/my/ToggleSwitch';
import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import { Account } from '@/types/socail';

export default function MySocailPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await authService.getSocialAcounts();
      setAccounts(res.accounts);
    };

    fetchAccounts();
  }, []);

  const isConnected = (platform: Account['platform']) => {
    return accounts.some((account) => account.platform === platform);
  };
  return (
    <div className="text-white flex flex-col h-screen bg-black py-10">
      <MyHeader title={'연동된 소셜계정'} />
      <span className="px-5 text-white font-medium text-xl mt-6 mb-6">
        소셜 계정을 연동해 <br />
        간편하게 로그인할 수 있어요.
      </span>
      <div className="flex flex-col gap-4">
        <p className="px-5 py-3 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <Image src={google} width={32} height={32} alt="google logo" className="mr-3" />
            <span>Google 계정 연결</span>
          </span>
          <ToggleSwitch checked={isConnected('GOOGLE')} />
        </p>
        <p className="px-5 py-3 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <Image src={naver} width={32} height={32} alt="naver logo" className="mr-3" />
            <span>네이버 계정 연결</span>
          </span>
          <ToggleSwitch checked={isConnected('NAVER')} />
        </p>
        <p className="px-5 py-3 flex  justify-between border-b border-gray-850">
          <span className="flex items-center">
            <Image src={kakao} width={32} height={32} alt="kakao logo" className="mr-3" />
            <span>카카오 계정 연결</span>
          </span>
          <ToggleSwitch checked={isConnected('KAKAO')} />
        </p>
      </div>
    </div>
  );
}
