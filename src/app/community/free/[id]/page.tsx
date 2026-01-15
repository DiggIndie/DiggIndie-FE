import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/FreeDetail.json';
import ArticleBody from '@/components/community/ArticleBody';
import { Checkbox } from '@mui/material';

type Props = {
  params: { id: string };
};

export default async function FreeArticleDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-black text-white max-w-[375px]">
      <ArticleHeader />
      <ArticleBody
        nickname={freeDetailData.member.nickname}
        time={freeDetailData.createdAt}
        title={freeDetailData.boardTitle}
        content={freeDetailData.boardContent}
        images={freeDetailData.imageUrls}
        likes={freeDetailData.liked}
        commentCount={freeDetailData.comment}
      />
      <CommentCard comments={freeDetailData.comments} />
      <section className="absolute bottom-0 p-5 w-full max-w-[375px]">
        <div className="bg-gray-800 px-4 py-3 rounded-sm">
          <Checkbox
            sx={{
              width: 20,
              height: 20,
              padding: 0,
              borderRadius: '4px',
              border: '1px solid #A5A1A1', // gray-700
              backgroundColor: '#fff',
              '& .MuiSvgIcon-root': {
                display: 'none',
              },
              '&.Mui-checked': {
                backgroundColor: '#ef4444', // 빨간 배경
                borderColor: '#dc2626',
              },
              '&.Mui-checked::after': {
                content: '"✔"',
                color: '#fff',
                fontSize: 12,
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          />
          <span className="text-sm font-medium text-main-red-2 pl-1 pr-2">익명</span>
          <input
            type="text"
            placeholder="댓글을 입력하세요."
            className="focus:outline-none font-normal text-sm placeholder-gray-600"
          />
        </div>
      </section>
    </div>
  );
}
