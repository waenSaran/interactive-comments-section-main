import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { PostType } from "./Post";

type VoteProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  postId: number;
  score: number;
};
function Vote({ postId, score, className, ...props }: VoteProps) {
  const [displayScore, setDisplayScore] = useState<number>(score);
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");

  useEffect(() => {
    posts.forEach((post: PostType) => {
      if (post.id === postId) post.score = displayScore;
      else if (
        post.replies &&
        post.replies.length > 0 &&
        post.replies.findIndex((reply: PostType) => reply.id === postId) !== -1
      ) {
        post.replies.forEach((reply: PostType) => {
          if (reply.id === postId) reply.score = displayScore;
        });
      }
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    // eslint-disable-next-line
  }, [displayScore]);

  const handleVote = (type: "up" | "down") => {
    setDisplayScore((prev) => prev + (type === "up" ? 1 : -1));
  };

  return (
    <div
      className={twMerge(
        clsx(
          "bg-purple-secondary px-2 py-1 flex flex-col h-fit gap-1 rounded-md",
          className
        )
      )}
      {...props}
    >
      <IconButton
        onClick={() => handleVote("up")}
        icon={
          <img
            src="/src/assets/images/icon-plus.svg"
            alt="Plus"
            width={12}
            height={12}
          />
        }
      />
      <p className="cursor-default text-purple-main font-bold text-center">
        {displayScore ?? 0}
      </p>
      <IconButton
        onClick={() => handleVote("down")}
        icon={
          <img
            src="/src/assets/images/icon-minus.svg"
            alt="Minus"
            width={12}
            height={12}
          />
        }
      />
    </div>
  );
}

export default Vote;
