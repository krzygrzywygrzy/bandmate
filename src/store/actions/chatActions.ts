import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { load, loaded, error } from "../reducers/chatsReducer";

export const chatsLoadThunk = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      dispatch({ type: load });
      let chats = [];
    } catch (e: any) {
      dispatch({
        type: error,
        payload: e.error_description || e.message,
      });
    }
  };
};
