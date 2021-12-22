import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/userReducer";
import { supabase, supabaseTables } from "../../supabaseClient";

export const thunkLogIn = (email: string, password: string):
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
        try {
            dispatch({ type: load });
            const { user, error } = await supabase.auth.signIn({ email, password });
            if (user) {
                //get data from supabase
                let { error, data } =
                    await supabase.from(supabaseTables.USER)
                        .select('name, surname').eq("user_id", user.id).single();

                //dispach acurate action
                if (error) { throw error; }
                if (data) {
                    dispatch({ type: loaded, payload: { id: user.id, ...data } })
                }
            } else if (error)
                throw error;
        } catch (err: any) {
            //TODO: dispatch accurate error
            dispatch({
                type: error, payload: {
                    message: err.message,
                }
            })
        }
    }
}