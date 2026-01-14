import Image from 'next/image';
import likeBtn from '@/assets/community/Heart.svg';
import commentsIcon from '@/assets/sideTab/Chat 2.svg';

interface ArticleBodyProps {
  title: string;
  nickname: string;
  time: string;
  content: string;
  images: string[];
  likes: number;
  commentCount: number;
}
export default function ArticleBody({
  title,
  nickname,
  time,
  content,
  images,
  likes,
  commentCount,
}: ArticleBodyProps) {
  return (
    <div className="flex flex-col w-full py-4 px-5">
      <span className="font-semibold text-xl text-white mb-1">{title}</span>
      <p className="flex gap-[7px] mb-2">
        <span className="text-gray-600 font-medium text-sm">{nickname}</span>
        <span className="text-gray-600 font-medium text-sm">{time}</span>
      </p>
      <div className="text-sm text-gray-300 font-normal mb-5">{content}</div>

      {/*이미지 row*/}
      {images.length > 0 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((src, idx) => (
            <div key={`${src}-${idx}`} className="w-50 h-50 rounded-sm">
              <Image
                src={src}
                alt={`article-image-${idx + 1}`}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* 좋아요, 댓글 수 */}
      <div className="flex gap-1 text-sm font-normal">
        <p className="flex gap-[3px] justify-center items-center">
          <Image src={likeBtn} alt="like" width={24} height={24} />
          <span className="font-normal text-sm text-white">{likes}</span>
        </p>
        <p className="flex gap-[3px] justify-center items-center">
          <Image src={commentsIcon} alt="comment" width={24} height={24} />
          <span className="font-normal text-sm text-white">{commentCount}</span>
        </p>
      </div>

      <p className="border-b-4 border-gray-850" />
    </div>
  );
}
