import CommentCard from "@/components/community/articles/CommentCard";
import type { ArticleComment } from "@/types/articleComment";
import type { User } from "@/types/user";

type Props = {
  comments: ArticleComment[];
  users: User[];
};

export default function CommentList({ comments, users }: Props) {
  const usersById = new Map(users.map((u) => [u.id, u]));

  return (
    <div className="flex flex-col mt-[24px]">
      {comments.map((comment) => {
        const author = usersById.get(comment.authorId);
        if (!author) return null;

        return (
          <CommentCard
            key={comment.id}
            comment={comment}
            author={author}
          />
        );
      })}
    </div>
  );
}
