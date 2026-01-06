import { env } from "@/lib/env";

//generic type T로 응답 받기
export async function apiFetch<T>(
  path: string,
  options: {
    query?: Record<string, string | number | boolean | null | undefined>;
  } & RequestInit = {}
): Promise<T> {
  const { query, ...init } = options;

  if (!env.BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL not set");
  }

  //url 만들기
  const url = new URL(path, env.BASE_URL);

  //query 있을 시 url에 붙이기
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}
