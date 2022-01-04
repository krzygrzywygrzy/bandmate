import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/chatsReducer";
import { supabase } from "../../supabaseClient";
import Chat from "../../models/Chat";

export const chatsLoadThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      dispatch({ type: load });

      //get chat list
      const chatList = await supabase
        .from("match")
        .select("chat_id")
        .eq("user_id", supabase.auth.user()?.id);
      if (chatList.error) throw chatList.error;

      //get chats data
      const ids = chatList.data[0].chat_id;
      const chatData = await supabase.from("chat").select().in("id", ids);
      if (chatData.error) throw chatData.error;

      //get users data

      let chats: Chat[] = [];
      for (let i = 0; i < ids.length; i++) {
        const res = await supabase
          .from("match")
          .select("user(name, surname, user_id)")
          .contains("chat_id", [ids[i]])
          .not("user_id", "eq", supabase.auth.user()?.id);
        if (res.error) throw res.error;
        else
          chats.push({
            id: chatData.data[i].id,
            messages: chatData.data[i].messages,
            user: res.data[0].user,
          });
      }

      dispatch({ type: loaded, payload: chats });
    } catch (e: any) {
      dispatch({
        type: error,
        payload: e.error_description || e.message,
      });
    }
  };
};