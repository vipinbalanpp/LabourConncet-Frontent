import { createSlice } from "@reduxjs/toolkit"
import { IUserDetailsForStore ,IBooking} from "../../../interfaces/user";
import { fetchUserData, getAllBookings, login, sendOtp, userSignUp, verifyOtp } from "../../actions/userActions"
import { workerSignUp } from "../../actions/workerActions"  
import {  removeCookie } from "typescript-cookie";
import instance from "../../../config/axiozConfig";
import { IWorkerDetailsForStore } from "../../../interfaces/worker";


const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user: null as IUserDetailsForStore | IWorkerDetailsForStore | null,
        bookings :[] as  IBooking[],
        error: null as string | null,
        loading: false as boolean ,
        message:  "" as string
    },
    reducers:{
        logout: (state) => {
            instance
              .post(`/auth/api/v1/logout`)
              .catch((e) => {
                console.error(e.message);
              });
              localStorage.removeItem('jwt')
            removeCookie("userToken");
            state.loading = false;
            state.user = null;
            state.error = null;
            state.message = "Logged out successfully";
          }
    },
    extraReducers(builder) {
        builder
            .addCase(userSignUp.pending,(state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(userSignUp.fulfilled,(state,action) =>{
                state.loading = false
                state.user = action.payload
                console.log(action.payload,'payload from slice when sign up');
                
                state.error = null
            })
            .addCase(userSignUp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
            .addCase(workerSignUp.pending,(state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(workerSignUp.fulfilled,(state,action) =>{
                state.loading = false
                state.user = action.payload
                console.log(action.payload);
                
                state.error = null
            })
            .addCase(workerSignUp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
            .addCase(sendOtp.pending,(state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(sendOtp.fulfilled,(state) =>{
                state.loading = false
                state.error = null
            })
            .addCase(sendOtp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
            .addCase(verifyOtp.pending,(state) =>{
                state.loading = true
                
                state.error = null
            })
            .addCase(verifyOtp.fulfilled,(state,action) =>{
                state.loading = false
                console.log(action,'action payload')
                state.error = null
            })
            .addCase(verifyOtp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
              })
              .addCase(login.fulfilled, (state, action) => {
                  console.log(action,'from slice');
                state.loading = false;
                state.user = action.payload.data
                state.error =null
              })
              .addCase(login.rejected, (state,{payload}) => {
                state.loading = false
                console.log("ERROR ACTION OBJ : ",payload)
              })
              .addCase(fetchUserData.pending,(state =>{
                state.loading = true;
              }))
              .addCase(fetchUserData.fulfilled,(state,action)=>{
                state.loading = false;
                console.log(action);
                
                state.user = action.payload;
                console.log(state.user);
                
              })
              .addCase(fetchUserData.rejected,(state,action)=>{
                state.loading = false
                state.error = action.payload as string 
              })
              .addCase(getAllBookings.pending,(state) =>{
                state.loading = true;
              })
              .addCase(getAllBookings.fulfilled,(state,action) => {
                    state.loading = false
                    console.log(action.payload,'This is all bookings from backend');
                    state.bookings = action.payload;
              })
              .addCase(getAllBookings.rejected, (state,action) => {
                state.loading = false
                state.error = action.payload as string 
              })
    }
    })
    export const {logout} = userSlice.actions
    export default userSlice.reducer



