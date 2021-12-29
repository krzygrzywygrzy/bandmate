import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/musiciansReducer";
import { supabase } from "../../supabaseClient";

export const thunkLoadMusicians = ():
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>
    ) => {
        try {

            dispatch({ type: load });

            const { data, error } =
                await supabase.from("user").select()
                    .not("user_id", "eq", supabase.auth.user()!.id);

            if (error) throw error;

            dispatch({ type: loaded, payload: data ?? [] })
        } catch (err: any) {
            dispatch({ type: error, payload: err.message, })
        }
    }
}

export const thunkSwipe = (like: boolean):
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
        getState: () => RootState,
    ) => {
        const { musicians } = getState();
        if (musicians.data && musicians.data!.length !== 0) {
            //TODO: implement
        }
    }
}