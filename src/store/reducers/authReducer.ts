import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    name?: string;
    loading: boolean;
}

const initialState: AuthState = {
    loading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        load: state => { return { loading: true } }
    }
});

export const { load } = authSlice.actions;

export default authSlice.reducer;