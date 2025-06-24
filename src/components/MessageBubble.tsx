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
    <div className={clsx(
      "flex flex-col",
      message.from === "ai" ? "items-start" : "items-end"
    )}>
      <div
        className={clsx(
          "max-w-[75%] px-4 py-3 rounded-lg text-sm whitespace-pre-line shadow-none",
          message.from === "ai"
            ? "bg-purple-50 border border-purple-300 text-purple-900"
            : "bg-gray-100 text-gray-900"
        )}
      >
        {message.text}
      </div>
      <span 
        className={clsx(
          "block mt-0.5 text-[10px] text-gray-400",
          message.from === "ai" ? "text-left" : "text-right"
        )}
        style={{ marginTop: "2px" }}
      >
        {message.time}
      </span>
    </div>
  );
}; 