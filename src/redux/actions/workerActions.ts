import { createAsyncThunk } from "@reduxjs/toolkit"
import { IWorkerCredentials } from "../../interfaces/worker"
import { AxiosError } from "axios"
import instance from "../../config/axiozConfig"

export const workerSignUp = createAsyncThunk(
    "worker/workerSignUp",
    async (userCredentials:IWorkerCredentials,{rejectWithValue}) =>{
        try{
            console.log(userCredentials,'------------>usercredential when register');
            
            const {data} = await instance.post(
                `auth/api/v1/worker/register`,
                userCredentials
            )
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError)
        }
    }
)