import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/userReducer";
import { supabase, supabaseTables } from "../../supabaseClient";


export const thunkWriteUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {

    }
}

