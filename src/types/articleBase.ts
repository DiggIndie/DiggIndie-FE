export type ArticleBase = {
  id: string;
  thumbnail: string;
  images: string[];
  title: string;
  content: string;
  written: number;
  view: number;
  likes: number;
  comments: string[];
};
//자유게시글과 정보게시글이 나중에 다른 props가 필요할 걸 대비해서 일단 만들어뒀음