import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Music from "../../models/Music";

interface MusicState {
    data?: Music;
    error?: any;
    loading: boolean;
}

const initialState: MusicState = {
    loading: false,
}

export const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        load: state => { return { loading: true } },
        loaded: (state, action: PayloadAction<Music>) => {
            return { loading: false, data: action.payload }
        },
        error: (state, action: PayloadAction<string>) => {
            return { loading: false, error: { message: action.payload } }
        }
    }
});

export const { load, loaded, error } = musicSlice.actions;
export default musicSlice.reducer;