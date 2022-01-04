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
      className={`flex items-center w-full border-2  py-2 cursor-pointer p-2 rounded ${
        current ? " border-purple-500" : "border-white"
      }`}
      onClick={() => setLocation(`/chats/${chat.id}`)}
    >
      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      <div className="ml-2">
        <p>
          {chat.user.name} {chat.user.surname}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
