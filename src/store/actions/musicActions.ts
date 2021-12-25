import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/musicReducer";
import { supabase } from "../../supabaseClient";

export const thunkLoadMusicData = ():
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ) => {
        try {
            dispatch({ type: load });
            const { data, error } = await supabase.from("genre").select();
            if (error) throw error;
            dispatch({ type: loaded, payload: { genres: data } });
        } catch (err: any) {
            dispatch({
                type: error, payload: err.message
            })
        }
    }
}