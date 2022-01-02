import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./reducers/musicReducer";
import userReducer from "./reducers/userReducer";
import musiciansReducer from "./reducers/musiciansReducer";
import chatsReducer from "./reducers/chatsReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer,
    musicians: musiciansReducer,
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
