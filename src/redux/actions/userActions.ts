import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import instance from "../../config/axiozConfig";
import { ILoginData, IUserCredentials } from "../../interfaces/user";
import { handleError } from "../../config/errorConfig";



export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userCredentials:IUserCredentials,{}) =>{
        try{
            const {data} = await instance.post(
                `auth/api/v1/user/register`,
                userCredentials
            )
            console.log(data);
            
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const sendOtp = createAsyncThunk(
    "sendOtp",
    async (email:string,{rejectWithValue}) =>{
        try{
            console.log(email,"when sending")
            const response = await instance.post(
                `notification/api/v1/send-otp?email=${email}`
            )
            return response;
        }catch(err){
            
            const axiosError = err as AxiosError
            console.log(axiosError,'from user actions')
            return handleError(axiosError,rejectWithValue);
        }
    }
)
type dataType ={
    email:string,
    otp:string
}
export const verifyOtp = createAsyncThunk(
    "verifyOtp",
        async (data:dataType,{}) =>{
        try{
            const response = await instance.post(
                `notification/api/v1/verify-otp?email=${data.email}&otp=${data.otp}`
            )
            console.log(response,"fshfosdfsd");
            
            return response;
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError);
        }
    }
)

export const login = createAsyncThunk(
    'auth/login', async (loginData:ILoginData,{rejectWithValue}) => {
    try{
        const response = await instance.post('auth/api/v1/login', loginData);
    return response.data;
    }catch(err){
        console.log(rejectWithValue);
        const axiosError = err as AxiosError

        return handleError(axiosError,rejectWithValue)
        
    }
  });
  export const fetchUserData = createAsyncThunk (
       'user/userDetails',async ()=>{
        try{
            const response = await instance.get('user/api/v1/userDetails',{withCredentials: true })
            console.log(response,'response in slice ');
            return response.data
        }
        catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError);
       } })
export const getAllBookings = createAsyncThunk(
    'booking/getAllBookings',async () =>{
        try{
            const response = await instance.get('booking/api/v1',{withCredentials:true})
            return response.data;
        } catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError);
       } })
