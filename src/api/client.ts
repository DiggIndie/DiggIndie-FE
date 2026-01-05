import { useAuthStore } from '@/stores/authStore';
import { ApiResponse } from '@/types/api';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function fetchClient<T>(url: string, options: FetchOptions): Promise<ApiResponse<T>> {
  const { auth = false, headers, ...rest } = options;
  const token = useAuthStore.getState().accessToken;

  const res = await fetch(`${BASE_URL}${url}`, {
    ...rest,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      useAuthStore.getState().logout();
    }
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
