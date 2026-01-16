
import { fetchClient } from "@/api/client";
import type { WeeklyConcertPayload, GetConcertsPayload } from "@/types/concerts";


// 위클리 캘린더 용
export type GetWeeklyConcertParams = {
  date: string;
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

// 공연 전체 검색 용
export type GetConcertParams = {
  order: "recent" | "view" | "scrap";
  query?: string;
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getConcerts(params: GetConcertParams) {
  const { order, query = "", page = 0, size = 10, sort } = params;

  const qs = new URLSearchParams();
  qs.set("order", order);
  qs.set("page", String(page));
  qs.set("size", String(size));

  const trimmed = query.trim();
  if (trimmed) qs.set("query", trimmed);

  if (sort?.length) {
    sort.forEach((s) => qs.append("sort", s));

  }
  console.log(`/concerts?${qs.toString()}`);


  return fetchClient<GetConcertsPayload>(`/concerts?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });

}

// 전체캘린더 공연 조회
export type GetConcertsByDatesParams = {
  dates: string[];
  page?: number;
  size?: number;
  sort?: string[];
};

export async function getConcertsByDates(params: GetConcertsByDatesParams) {
  const { dates, page = 0, size = 20, sort } = params;

  const qs = new URLSearchParams();

  dates.forEach((d) => qs.append("dates", d));

  qs.set("page", String(page));
  qs.set("size", String(size));

  if (sort?.length) sort.forEach((s) => qs.append("sort", s));

  return fetchClient<GetConcertsPayload>(`/concerts/calendar?${qs.toString()}`, {
    method: "GET",
    auth: false,
  });
}