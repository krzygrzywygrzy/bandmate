import React from "react";
import Message from "../../models/Message";
import { supabase } from "../../supabaseClient";

interface Props {
  message: Message;
}

const MessageCard: React.FC<Props> = ({ message }) => {
  return (
    <div
      className={`px-4 py-2  rounded mb-1 max-w-lg ${
        message.user_id === supabase.auth.user()?.id
          ? "bg-purple-600 text-white place-self-end"
          : "bg-gray-100 place-self-start"
      }`}
    >
      {message.content}
    </div>
  );
};

export default MessageCard;
