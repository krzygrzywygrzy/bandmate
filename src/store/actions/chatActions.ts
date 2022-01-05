import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/chatsReducer";
import { supabase } from "../../supabaseClient";
import Chat from "../../models/Chat";
import Message from "../../models/Message";

export const sendMessageThunk = (
  content: string,
  chat: number
): ThunkAction<Promise<undefined | string>, RootState, unknown, AnyAction> => {
  return async (_dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    let { error } = await supabase.rpc("append_message", {
      message: {
        content,
        user_id: supabase.auth.user()!.id,
        sent: Date.now(),
      },
      chat,
    });

    if (error) return error.message;
  };
};

export const updateChatsThunk = (
  messages: Message[],
  id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    let chat = {
      ...getState().chats.data!.filter((chat) => chat.id === id)[0],
    };
    chat.messages = messages;

    let newChats = getState().chats.data!.filter((c) => c.id !== id);
    dispatch({ type: loaded, payload: newChats });
  };
};

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
        .eq("user_id", supabase.auth.user()?.id)
        .single();
      if (chatList.error) throw chatList.error;

      //get chats data
      const ids = chatList.data.chat_id;
      const chatData = await supabase.from("chat").select().in("id", ids);
      if (chatData.error) throw chatData.error;

      //get users data

      let chats: Chat[] = [];
      for (let i = 0; i < ids.length; i++) {
        const res = await supabase
          .from("match")
          .select("user(name, surname, user_id)")
          .contains("chat_id", [ids[i]])
          .not("user_id", "eq", supabase.auth.user()?.id)
          .single();
        if (res.error) throw res.error;
        else
          chats.push({
            id: chatData.data[i].id,
            messages: chatData.data[i].messages,
            user: res.data.user,
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
