import ArticleHeader from '@/components/community/articles/ArticleHeader';
import ArticleAuthorRow from '@/components/community/articles/ArticleAuthorRow';
import ArticleBody from '@/components/community/articles/ArticleBody';
import CommentList from '@/components/community/articles/CommentList';

import type { ArticleBase } from '@/types/articleBase';
import type { User } from '@/types/user';
import type { ArticleComment } from '@/types/articleComment';

type Props<T extends ArticleBase> = {
  article: T;
  author: User;
  comments: ArticleComment[];
  users: User[];
};

export default function ArticleDetail<T extends ArticleBase>({
  article,
  author,
  comments,
  users,
}: Props<T>) {
  return (
    <div className="min-h-screen bg-black text-white">
      <ArticleBody article={article} />
      <CommentList comments={comments} users={users} />
    </div>
  );
}
