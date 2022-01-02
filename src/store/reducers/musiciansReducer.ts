import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface MusiciansState {
  data?: User[];
  error?: { message: string };
  loading: boolean;
}

const initialState: MusiciansState = {
  loading: false,
};

export const musiciansSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    load: (_) => {
      return { loading: true };
    },
    loaded: (_, action: PayloadAction<User[]>) => {
      return { loading: false, data: action.payload };
    },
    error: (_, action: PayloadAction<string>) => {
      return { loading: false, error: { message: action.payload } };
    },
  },
});

export const { load, loaded, error } = musiciansSlice.actions;
export default musiciansSlice.reducer;
