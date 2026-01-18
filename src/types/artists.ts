export interface OnboardArtist {
  bandId: number;
  bandName: string;
  imageUrl: string | null;
}

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface OnboardArtistsResponse {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: OnboardArtist[];
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

export type GetArtistsParams = {
  order?: ArtistOrder;
  query?: string;
  page?: number;
  size?: number;
};

//마이 아티스트 용
export type MyArtistsItem = {
  bandId: number;
  bandName: string;
  keywords: string[];
  bandImage: string;
  mainMusic: string;
}

export type MyArtistsPayload = {
  artists: MyArtistsItem[];
}
