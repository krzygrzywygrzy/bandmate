import React from "react";
import { useAppSelector } from "../../store/hooks";

interface Props {
  chat_id: number;
}

const Chat: React.FC<Props> = ({ chat_id }) => {
  const chat = useAppSelector((state) =>
    state.chats.data!.filter((el) => el.id === chat_id)
  );
  return (
    <div>
      <div className="py-4 border-b">
        {chat[0].user.name} {chat[0].user.surname}
      </div>
    </div>
  );
};

export default Chat;
