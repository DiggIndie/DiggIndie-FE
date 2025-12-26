export type InfoArticles = {
  thumbnail: string;   // 이미지 URL or static import 경로
  title: string;
  content: string;
  written: number;     // n분 전 (ex: 12)
  view: number;        // 조회수 (ex: 107)
};
