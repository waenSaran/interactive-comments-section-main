import type { UserType } from "./Profile";
import Profile from "./Profile";
import Vote from "./Vote";
import mockData from "../assets/data.json";
import Button from "./Button";
import { useState } from "react";
import TextAreaInputField from "./TextAreaInputField";
import Column from "./Column";
import Modal from "./Modal";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { renderTimestamp } from "../utils/date-utils";

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replyingTo?: string;
  replies?: Array<PostType>;
};

export type PostProps = PostType & {
  onReply?: () => void;
  onUpdateComment?: (value: string) => void;
  onConfirmDelete?: (id: number) => void;
};

type ReplyButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  onReply: () => void;
};
function ReplyButton({ onReply, className, ...props }: ReplyButtonProps) {
  return (
    <Button
      buttonType="text"
      className={twMerge(clsx("ml-auto items-baseline", className))}
      iconSrc="src/assets/images/icon-reply.svg"
      onClick={onReply}
      {...props}
    >
      <span className="font-semibold text-purple-main">Reply</span>
    </Button>
  );
}

type AuthActionButtonsProps = React.HTMLAttributes<HTMLDivElement> & {
  onEdit: () => void;
  onDelete: () => void;
};

function AuthActionButtons({
  onEdit,
  onDelete,
  className,
  ...props
}: AuthActionButtonsProps) {
  return (
    <div className={twMerge(clsx("ml-auto flex gap-5", className))} {...props}>
      <Button
        buttonType="text"
        iconSrc="src/assets/images/icon-delete.svg"
        onClick={onDelete}
      >
        <span className="font-semibold text-error-main">Delete</span>
      </Button>
      <Button
        buttonType="text"
        iconSrc="src/assets/images/icon-edit.svg"
        onClick={onEdit}
      >
        <span className="font-semibold text-purple-main">Edit</span>
      </Button>
    </div>
  );
}

function Post({
  id,
  replyingTo,
  content: defaultContent,
  createdAt,
  score,
  user,
  onReply = () => {},
  onConfirmDelete = () => {},
}: PostProps) {
  const isCurrentUser = mockData.currentUser.username === user.username;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>(defaultContent);
  const localStoragePosts = JSON.parse(localStorage.getItem("posts") || "[]");

  const handleOnEdit = () => {
    setIsEditing(true);
    const replyTo = replyingTo ? `@${replyingTo} ` : "";
    setContent(replyTo + content);
  };

  const handleOnUpdateComment = () => {
    const newContent = content.replaceAll(`@${replyingTo} `, "");
    setContent(newContent);

    localStoragePosts.forEach((p: PostType) => {
      if (p.id === id) p.content = newContent;
      else if (
        p.replies &&
        p.replies.length > 0 &&
        p.replies.findIndex((r) => r.id === id) !== -1
      ) {
        p.replies.forEach((r: PostType) => {
          if (r.id === id) r.content = newContent;
        });
      }
    });
    localStorage.setItem("posts", JSON.stringify(localStoragePosts));
    setIsEditing(false);
  };

  const handleOnDelete = () => {
    setIsOpenModal(true);
  };

  const handleOnConfirmDelete = () => {
    onConfirmDelete(id);
    setIsOpenModal(false);
  };

  return (
    <div className="bg-white rounded-md p-5 gap-5 flex">
      <Vote postId={id} score={score} className="hidden sm:block" />
      <div className="flex flex-col gap-3 w-full">
        <div className="header flex h-fit gap-5">
          <Profile {...user} />
          <span className="text-gray-400 max-w-32">{renderTimestamp(createdAt)}</span>
          {isCurrentUser ? (
            <AuthActionButtons
              onEdit={handleOnEdit}
              onDelete={handleOnDelete}
              className="hidden sm:flex"
            />
          ) : (
            <ReplyButton onReply={onReply} className="hidden sm:flex" />
          )}
        </div>
        {isEditing ? (
          <Column gap={3}>
            <TextAreaInputField
              name={`content-${id}`}
              value={content}
              rows={3}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            />
            <Button
              className="ml-auto"
              onClick={handleOnUpdateComment}
              buttonType="contain"
            >
              <span className="text-white font-semibold text-xs">UPDATE</span>
            </Button>
          </Column>
        ) : (
          <div className="content-block">
            {replyingTo && (
              <span className="font-bold text-purple-main">@{replyingTo} </span>
            )}
            <span className="content text-gray-500">{content}</span>
          </div>
        )}
        <div className="flex items-center sm:hidden">
          <Vote
            postId={id}
            score={score}
            className="flex flex-row w-fit gap-3"
          />
          {isCurrentUser ? (
            <AuthActionButtons
              onEdit={handleOnEdit}
              onDelete={handleOnDelete}
            />
          ) : (
            <ReplyButton onReply={onReply} className="flex" />
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        onConfirmDelete={handleOnConfirmDelete}
      />
    </div>
  );
}

export default Post;
