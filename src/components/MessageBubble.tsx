import clsx from "clsx";
import { FC } from "react";

export interface Message {
  id: string;
  from: "ai" | "user";
  text: string;
  time: string;
}

interface Props {
  message: Message;
}

export const MessageBubble: FC<Props> = ({ message }) => {
  return (
    <div
      className={clsx(
        "max-w-[75%] px-4 py-3 rounded-lg text-sm whitespace-pre-line shadow",
        message.from === "ai"
          ? "bg-purple-50 border border-purple-300 text-purple-900 self-start"
          : "bg-gray-100 text-gray-900 self-end"
      )}
    >
      {message.text}
      <span className="block mt-1 text-[10px] text-gray-400 text-right">
        {message.time}
      </span>
    </div>
  );
}; 