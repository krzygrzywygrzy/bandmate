import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/userReducer";
import { supabase } from "../../supabaseClient";
import User from "../../models/User";


export const thunkWriteUser = (user: User):
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ) => {
        try {
            dispatch({ type: load });
            const { error } = await supabase.from("user").insert([
                { ...user }
            ]);
            if (error)
                throw error;
            const auth = await supabase.auth.update(
                { data: { ...supabase.auth.user()!.user_metadata, filled: true } });
            if (auth.error) throw auth.error;
            dispatch({ type: loaded, payload: user })
        } catch (e: any) {
            dispatch({ type: error, payload: e.error_description || e.message })
        }
    }
}

