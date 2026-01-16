export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
};

export type ConcertItem = {
  concertId: number;
  concertName: string;
  dDay: string;
  lineUp: string[];
  mainImage: string;
  period: string;
};

export type GetConcertsPayload = {
  concerts: ConcertItem[];
  pageInfo: PageInfo;

};

export type WeeklyConcertItem = {
  concertId: number;
  concertName: string;
  startsAt: string;
  concertHall: string;
};

export type WeeklyConcertPayload = {
  concerts: WeeklyConcertItem[];
  pageInfo: PageInfo;
};