import React, { useState } from "react";
import { sendMessageThunk } from "../../store/actions/chatActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MessageCard from "./Message";

interface Props {
  chat_id: number;
}

const Chat: React.FC<Props> = ({ chat_id }) => {
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const sendMessage = async (e: any) => {
    e.preventDefault();
    setMessage("");
    const res = await dispatch(sendMessageThunk(message, chat_id));
    if (res) {
      //TODO: show info
    }
  };

  const chat = useAppSelector((state) =>
    state.chats.data!.filter((el) => el.id === chat_id)
  );

  return (
    <div className="flex flex-col h-full">
      <div className="py-4 border-b">
        {chat[0].user.name} {chat[0].user.surname}
      </div>
      <div className="grow-horizontally">
        {chat[0].messages.length > 0 ? (
          <div className="w-full flex flex-col my-4 overflow-y-scroll hide-scrollbar">
            {chat[0].messages.map((message, index) => {
              return <MessageCard message={message} key={index} />;
            })}
          </div>
        ) : (
          <div className="py-4 text-center">Start conversation</div>
        )}
      </div>
      <div>
        <form onSubmit={sendMessage} className="flex mb-2">
          <input
            className="text-input mr-2"
            placeholder="type here...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="chat-button">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
