import React, { useEffect } from "react";
import Chat from "../../components/chats/Chat";
import ChatCard from "../../components/chats/ChatCard";
import AuthWrapper from "../../components/layout/AuthWrapper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
  chat_id?: string;
}

const Chats: React.FC<Props> = ({ chat_id }) => {
  const chats = useAppSelector((state) => state.chats);

  if (!chats.data) {
    return <div className="site-container">Loading....</div>;
  }

  return (
    <AuthWrapper>
      <div className="grid grid-cols-5 mt-8 h-full">
        <div className="border-r  mr-4 pr-4 h-full">
          {chats.data.map((chat) => {
            return (
              <ChatCard
                chat={chat}
                key={chat.id}
                current={parseInt(chat_id ?? "") === chat.id}
              />
            );
          })}
        </div>
        <div className="col-span-4 chat border-r pr-4">
          {chat_id ? (
            <Chat chat_id={parseInt(chat_id)} />
          ) : (
            <div>Select chat to send and receive messages</div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Chats;
