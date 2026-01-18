export type PageInfo = {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface Artist {
  bandId: number;
  bandName: string;
  imageUrl: string | null;
}

export interface OnboardArtistsResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: Artist[];
  isSuccess: boolean;
}


//아티스트 검색용
export type ArtistOrder = "recent" | "alphabet" | "scrap";

export type TopTrack = {
  title: string;
  externalUrl: string;
};

export type ArtistItem = {
  artistId: number;
  artistName: string;
  keywords: string[];
  artistImage: string;
  topTrack: TopTrack | null;
};

export type ArtistPayload = {
  artists: ArtistItem[];
  pageInfo: PageInfo;
};

export type ArtistResponse = {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  pageInfo: PageInfo;
  payload: ArtistPayload;
};

export type GetArtistsParams = {
  order?: ArtistOrder;
  query?: string;
  page?: number;
  size?: number;
};