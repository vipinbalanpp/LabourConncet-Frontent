import {  configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user/UserSlice";

export const store = configureStore({
    reducer:userSlice
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;