import React from "react";
import Chat from "../../models/Chat";
import { useLocation } from "wouter";

interface Props {
  chat: Chat;
  current?: boolean;
}

const ChatCard: React.FC<Props> = ({ chat, current }) => {
  const [, setLocation] = useLocation();

  return (
    <div
      className={`flex items-center justify-center md:justify-start w-full cursor-pointer md:p-2 p-1 rounded ${
        current ? " bg-gray-100" : ""
      }`}
      onClick={() => setLocation(`/chats/${chat.id}`)}
    >
      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-300"></div>
      <div className="ml-2 hidden md:block truncate overflow-hidden">
        <p>
          {chat.user.name} {chat.user.surname}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
