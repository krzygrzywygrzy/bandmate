import { configureStore } from "@reduxjs/toolkit"
import musicReducer from "./reducers/musicReducer";
import userReducer from "./reducers/userReducer";
import musiciansReducer from "./reducers/musiciansReducer";


export const store = configureStore({
    reducer: {
        user: userReducer,
        music: musicReducer,
        musicians: musiciansReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

