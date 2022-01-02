import React from "react";
import AuthWrapper from "../../components/layout/AuthWrapper";

interface Props {
  chat_id: string;
}

const Chats: React.FC<Props> = () => {
  return (
    <AuthWrapper>
      <div className="grid grid-cols-5">
        <div>Chat select</div>
        <div className="col-span-4">actual chat</div>
      </div>
    </AuthWrapper>
  );
};

export default Chats;
