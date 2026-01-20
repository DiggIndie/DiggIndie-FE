export interface Artist {
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
  payload: Artist[];
  isSuccess: boolean;
}

// types/artistDetail.ts
export interface ArtistDetail {
  artistId: number;
  artistName: string;
  artistImage: string | null;
  keywords: string[];
  description: string;
  members: string[];
  topTrack: {
    title: string;
    externalUrl: string;
  } | null;
  albums: Album[];
  scheduledConcerts: Concert[];
  endedConcerts: Concert[];
  isScraped: boolean;
}

export interface Album {
  albumId: number;
  albumName: string;
  albumImage: string;
  releaseYear: string;
}

export interface Concert {
  concertId: number;
  concertName: string;
  concertImage: string;
  dDay: string | null;
  lineUp: string[];
  concertDate: string;
}
