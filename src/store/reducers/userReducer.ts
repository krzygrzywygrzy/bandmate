import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface UserState {
  data?: User;
  error?: { message: string };
  loading: boolean;
}

const initialState: UserState = {
  loading: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    load: (_) => {
      return { loading: true };
    },
    loaded: (_, action: PayloadAction<User>) => {
      return { loading: false, data: action.payload };
    },
    error: (_, action: PayloadAction<string>) => {
      return { loading: false, error: { message: action.payload } };
    },
    cancel: (_) => {
      return { loading: false };
    },
  },
});

export const { load, loaded, error, cancel } = userSlice.actions;
export default userSlice.reducer;
