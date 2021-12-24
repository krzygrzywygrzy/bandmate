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
            return { loading: false, data: action.payload };
        },
        error: (state, action: PayloadAction<string>) => {
            return { loading: false, error: { message: action.payload } }
        },
        cancel: state => { return { loading: false } }
    }
});

export const { load, loaded, error, cancel } = userSlice.actions;
export const userAction = userSlice.actions;
export default userSlice.reducer;