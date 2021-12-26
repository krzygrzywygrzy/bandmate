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

            //select genres
            const genres = await supabase.from("genre").select();
            if (genres.error) throw error;

            //select instruments
            const instruments = await supabase.from("instrument").select();
            if (instruments.error) throw error;

            //dispatch 
            dispatch({ type: loaded, payload: { genres: genres.data, instruments: instruments.data } });
        } catch (err: any) {
            dispatch({
                type: error, payload: err.message
            })
        }
    }
}