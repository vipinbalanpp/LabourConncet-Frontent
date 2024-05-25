import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { AuthBaseUrl, NotificationBaseUrl } from "../../config/constants";
import instance from "../../config/axiozConfig";


type userCredentialsType={
    fullName : string,
      email:string,
      password:string,
      role:string
}
export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userCredentials:userCredentialsType,{rejectWithValue}) =>{
        try{
            const {data} = await instance.post(
                `${AuthBaseUrl}/register`,
                userCredentials
            )
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError)
        }
    }
)
export const sendOtp = createAsyncThunk(
    "sendOtp",
    async (email:string,{rejectWithValue}) =>{
        try{
            console.log(email,"when sending")
            const response = await instance.post(
                `notification/send-otp?email=${email}`
            )
            return response;
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError);
        }
    }
)
type dataType ={
    email:string,
    otp:string
}
export const verifyOtp = createAsyncThunk(
    "verifyOtp",
        async (data:dataType,{rejectWithValue}) =>{
        try{
            const response = await instance.post(
                `/notification/verify-otp?email=${data.email}&otp=${data.otp}`
            )
            console.log(response,"fshfosdfsd");
            
            return response;
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError);
        }
    }
)