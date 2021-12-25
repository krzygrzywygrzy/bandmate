import { configureStore } from "@reduxjs/toolkit"
import musicReducer from "./reducers/musicReducer";
import userReducer from "./reducers/userReducer";



export const store = configureStore({
    reducer: {
        user: userReducer,
        music: musicReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

