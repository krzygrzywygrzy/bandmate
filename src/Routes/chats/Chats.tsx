import React, { useEffect } from "react";
import AuthWrapper from "../../components/layout/AuthWrapper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
  chat_id?: string;
}

const Chats: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats);

  return (
    <AuthWrapper>
      <div className="grid grid-cols-5">
        <div>Chat select</div>
        <div className="col-span-4">{JSON.stringify(chats)}</div>
      </div>
    </AuthWrapper>
  );
};

export default Chats;
