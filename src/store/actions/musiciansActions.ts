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
            try {
                if (!like)
                    dispatch({ type: loaded, payload: musicians.data.slice(1) });
                else {
                    //check if you are liked by person
                    const swipe = await supabase.from("user").select("likes, matches").filter("user_id", "eq", musicians.data[0].user_id);
                    if (swipe.error) throw swipe.error;

                    console.log(swipe.data);


                    if (swipe.data[0].likes.includes(supabase.auth.user()!.id)) {
                        //if you are liked: match 

                    } else {
                        //else add swipe to your likes
                    }

                }
            } catch (err: any) {
                dispatch({ type: error, payload: err.message, });
            }

        }
    }
}