import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Chat from "../../models/Chat";

interface ChatsState {
  loading: boolean;
  error?: { message: string };
  data?: Chat[];
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
    loaded: (_, action: PayloadAction<Chat[]>) => {
      return { loading: false, data: action.payload };
    },
  },
});

export const { load, error, loaded } = chatsSlice.actions;
export default chatsSlice.reducer;
