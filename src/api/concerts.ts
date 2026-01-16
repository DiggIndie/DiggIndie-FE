// src/api/concerts.ts
import { fetchClient } from "@/api/client";
import type { WeeklyConcertPayload } from "@/types/concerts";

export type GetWeeklyConcertParams = {
  date: string; // YYYY-MM-DD
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getWeeklyConcerts(params: GetWeeklyConcertParams) {
  const { date, page = 0, size = 10, sort } = params;

  const qs = new URLSearchParams();
  qs.set("date", date);
  qs.set("page", String(page));
  qs.set("size", String(size));
  if (sort?.length) sort.forEach((s) => qs.append("sort", s));

  return fetchClient<WeeklyConcertPayload>(`/concerts/calendar/weekly?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });
}
