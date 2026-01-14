import ArticleHeader from '@/components/community/ArticleHeader';
import CommentCard from '@/components/community/CommentCard';
import freeDetailData from '@/mocks/community/FreeDetail.json';
import ArticleBody from '@/components/community/ArticleBody';

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
    </div>
  );
}
