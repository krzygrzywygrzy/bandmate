import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface MusiciansState {
  data?: User[];
  error?: any;
  loading: boolean;
}

const initialState: MusiciansState = {
  loading: false,
};

export const musiciansSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    load: (state) => {
      return { loading: true };
    },
    loaded: (state, action: PayloadAction<User[]>) => {
      return { loading: false, data: action.payload };
    },
    error: (state, action: PayloadAction<string>) => {
      return { loading: false, error: { message: action.payload } };
    },
  },
});

export const { load, loaded, error } = musiciansSlice.actions;
export default musiciansSlice.reducer;
