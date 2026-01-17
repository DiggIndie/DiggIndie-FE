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
  startsAt: string;
  concertHall: string;
};

export type GetConcertsResponse = {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: {
    concerts: ConcertItem[];
    pageInfo: PageInfo;
  };
  isSuccess: boolean;
};
export interface ConcertLineUp {
  bandId: number;
  bandName: string;
  bandImage: string;
}
export interface ConcertDetail {
  concertName: string;
  isScrapped: boolean;
  startDate: string;
  concertHallName: string;
  address: string;
  preorderPrice: number;
  onsitePrice: number;
  imageUrl: string;
  description: string;
  lineUp: ConcertLineUp[];
}
