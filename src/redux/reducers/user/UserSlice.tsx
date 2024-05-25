import { createSlice } from "@reduxjs/toolkit"
import { sendOtp, userSignUp, verifyOtp } from "../../actions/userActions"
const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        user: null ,
        error: null as string | null,
        loading: false as boolean 
    },
    reducers:{
        logout:(state) =>{
            state.user = null
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
                state.error = null
            })
            .addCase(userSignUp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
            .addCase(sendOtp.pending,(state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(sendOtp.fulfilled,(state,action) =>{
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
                console.log(action)
                console.log(action.payload?.data)
                state.error = null
            })
            .addCase(verifyOtp.rejected,(state,action) => {
                state.loading = false
                state.error = action.payload as string 
            })
    }
    })

    export const {logout} = userSlice.actions
    export default userSlice.reducer



