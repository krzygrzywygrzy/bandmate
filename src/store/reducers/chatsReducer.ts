import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Message from "../../models/Message";
import User from "../../models/User";

interface ChatsState {
  loading: boolean;
  error?: { message: string };
  data?: { user: User; message: Message }[];
}

const initialState: ChatsState = { loading: false };

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    load: (_) => {
      return { loading: true };
    },
    error: (_, action: PayloadAction<string>) => {
      return { loading: false, error: { message: action.payload } };
    },
    loaded: (_, action: PayloadAction<{ user: User; message: Message }[]>) => {
      return { loading: false, data: action.payload };
    },
  },
});
