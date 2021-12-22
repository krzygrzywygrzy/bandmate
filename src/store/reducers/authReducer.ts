import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    data?: any;
    error?: any;
    loading: boolean;
}

const initialState: AuthState = {
    loading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        load: state => { return { loading: true } },
        loaded: (state, action: PayloadAction<any>) => {
            //TODO: implement
            console.log("loaded");
        },
        error: (state, action: PayloadAction<any>) => {
            //TODO: implement
        },
        cancel: state => { return { loading: false } }
    }
});

export const { load, loaded, error, cancel } = authSlice.actions;

export default authSlice.reducer;