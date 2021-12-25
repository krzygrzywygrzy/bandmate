import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/userReducer";
import { supabase, supabaseTables } from "../../supabaseClient";
import LoginData from "../../models/auth/LoginData";
import RegisterData from "../../models/auth/RegisterData";


export const thunkLogIn = (data: LoginData):
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
        try {
            dispatch({ type: load });
            const { user, error } = await supabase.auth.signIn({ ...data });
            if (user) {
                //get data from supabase
                let { error, data } =
                    await supabase.from(supabaseTables.USER)
                        .select('name surname').eq("user_id", user.id).single();

                //dispach acurate action
                if (error) { throw error; }
                if (data) {
                    dispatch({ type: loaded, payload: { id: user.id, ...data } })
                }
            } else if (error)
                throw error;
        } catch (err: any) {
            dispatch({
                type: error, payload: err.message
            })
        }
    }
}

export const thunkRegister =
    (data: RegisterData):
        ThunkAction<void, RootState, unknown, AnyAction> => {
        return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
            try {
                dispatch({ type: load });
                const { user, error } = await supabase.auth.signUp({ email: data.email, password: data.password, }, { data: { name: data.name, surname: data.surname } });
                if (error) throw error;
                if (user) {
                    //save info to db
                    const { error } = await supabase.from(supabaseTables.USER).insert({ name: data.name, surname: data.surname, user_id: user.id })
                    if (error) throw error;
                    dispatch({ type: loaded, payload: { name: data.name, surname: data.surname, id: user.id } })
                }
            } catch (err: any) {
                dispatch({
                    type: error, payload: {
                        message: err.message
                    }
                })
            }

        }
    }