import { env } from "@/lib/env";

export async function apiFetch<T>(
  path: string,
  options: {
    query?: Record<string, string | number | boolean | null | undefined>;
    useDevAuth?: boolean;
  } & RequestInit = {}
): Promise<T> {
  const { query, useDevAuth, ...init } = options;

  if (!env.BASE_URL) throw new Error("NEXT_PUBLIC_BASE_URL not set");

  const url = new URL(path, env.BASE_URL);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      url.searchParams.set(k, String(v));
    });
  }

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  if (useDevAuth) {
    const token = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}
