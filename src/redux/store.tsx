import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/user/UserSlice";

export const store = configureStore({
    reducer:{
        user: UserSlice
    }
})

export type AppDispatch = typeof store.dispatch