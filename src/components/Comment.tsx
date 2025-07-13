import { useState } from "react";
import type { UserType } from "./Profile";
import TextAreaInputField from "./TextAreaInputField";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { getAvatar } from "../utils/image-utils";

type SubmitButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  onSubmit: () => void;
};
function SubmitButton({
  label,
  onSubmit,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "flex items-center bg-purple-main px-5 py-2 rounded-md h-fit w-fit cursor-pointer hover:opacity-50",
          className
        )
      )}
      type="button"
      onClick={onSubmit}
      {...props}
    >
      <span className="text-white font-semibold sm:text-xs text-base">
        {label}
      </span>
    </button>
  );
}

type AvatarProps = React.HTMLAttributes<HTMLImageElement> & {
  imgSrc: string;
};
function Avatar({ imgSrc, className, ...props }: AvatarProps) {
  return (
    <img
      className={twMerge(clsx("h-fit", className))}
      src={imgSrc}
      alt="My profile"
      height={32}
      width={32}
      {...props}
    />
  );
}

type CommentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  UserType & {
    label?: "reply" | "send";
    replyTo?: string;
    onComment: (value: string) => void;
  };
function Comment({
  image,
  label = "send",
  replyTo = "",
  onComment,
  className,
  ...wrapperProps
}: CommentProps) {
  const replyingTo = replyTo ? `@${replyTo} ` : "";
  const [comment, setComment] = useState<string>(replyingTo + "");
  const handleSubmit = () => {
    onComment(comment);
    setComment("");
  };

  return (
    <div
      className={twMerge(
        clsx(
          "bg-white rounded-md p-5 gap-5 flex flex-col sm:flex sm:flex-row",
          className
        )
      )}
      {...wrapperProps}
    >
      <Avatar className="hidden sm:flex" imgSrc={getAvatar(image.png)} />
      <TextAreaInputField
        name="comment"
        placeholder="Add a comment..."
        rows={3}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <SubmitButton
        className="hidden sm:flex"
        label={label.toUpperCase()}
        onSubmit={handleSubmit}
      />
      <div className="flex sm:hidden">
        <Avatar imgSrc={`../../src/assets${image.png}`} />
        <SubmitButton
          className="ml-auto"
          label={label.toUpperCase()}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Comment;
