import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/musiciansReducer";
import { supabase } from "../../supabaseClient";
import { load as userLoad } from "../reducers/userReducer";


export const thunkLoadMusicians = ():
    ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (
        dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    ) => {
        try {
            dispatch({ type: load });

            const you = await supabase.from("user").select("*, match(likes, matches)").match({ user_id: supabase.auth.user()!.id });
            if (you.error) throw you.error;

            const exclude = [supabase.auth.user()!.id, ...you.data[0].match[0].likes, ...you.data[0].match[0].matches].toString();
            const { data, error } =
                await supabase.from("user").select()
                    .not("user_id", "in", `(${exclude})`);
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
                    const swipe = await supabase.from("match").select("likes, matches, chat_id").filter("user_id", "eq", musicians.data[0].user_id);
                    if (swipe.error) throw swipe.error;

                    const you = await supabase.from("match").select("likes, matches, chat_id").filter("user_id", "eq", supabase.auth.user()!.id);
                    if (you.error) throw you.error;



                    if (swipe.data[0].likes.includes(supabase.auth.user()!.id)) {
                        //if you are liked: match 

                        //create chat
                        const chat = await supabase.from("chat").insert({});
                        if (chat.error) throw chat.error;

                        //update swiped person
                        const swipeUpdate = await supabase.from("match").update({
                            matches: [...swipe.data[0].matches, supabase.auth.user()!.id],
                            likes: [...swipe.data[0].likes.filter((el: string) => el !== supabase.auth.user()!.id)],
                            chat_id: [...swipe.data[0].chat_id, chat.data[0].id],
                        }).match({ user_id: musicians.data[0].user_id });
                        if (swipeUpdate.error) throw swipeUpdate.error;

                        //update your data
                        const yoursUpdate = await supabase.from("match").update({
                            matches: [...you.data[0].matches, musicians.data[0].user_id],
                            likes: [...you.data[0].likes.filter((el: string) => el !== musicians.data![0].user_id)],
                            chat_id: [...you.data[0].chat_id, chat.data[0].id],
                        }).match({ user_id: supabase.auth.user()!.id });
                        if (yoursUpdate.error) throw yoursUpdate.error;


                    } else {
                        const yoursUpdate = await supabase.from("match").update({
                            likes: [...you.data[0].likes, musicians.data![0].user_id]
                        }).match({ user_id: supabase.auth.user()!.id });
                        if (yoursUpdate.error) throw yoursUpdate.error;
                    }
                    dispatch({ type: userLoad });
                    dispatch({ type: loaded, payload: musicians.data.slice(1) });
                }
            } catch (err: any) {
                dispatch({ type: error, payload: err.message, });
            }

        }
    }
}