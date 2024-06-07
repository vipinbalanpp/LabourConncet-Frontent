import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user/UserSlice";
import adminSlice from "./reducers/admin/adminSlice";


const reducer = combineReducers({
   user: userSlice,
   admin: adminSlice
})
export const store = configureStore({
    reducer:reducer
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;