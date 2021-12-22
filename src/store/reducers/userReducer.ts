import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/User";

interface UserState {
    data?: User;
    error?: any;
    loading: boolean;
}

const initialState: UserState = {
    loading: false
}

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        load: state => { return { loading: true } },
        loaded: (state, action: PayloadAction<User>) => {
            //TODO: implement
            console.log("loaded");
        },
        error: (state, action: PayloadAction<any>) => {
            //TODO: implement
        },
        cancel: state => { return { loading: false } }
    }
});

export const { load, loaded, error, cancel } = userSlice.actions;

export default userSlice.reducer;