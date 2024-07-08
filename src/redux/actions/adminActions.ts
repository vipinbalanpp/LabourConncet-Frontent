import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiozConfig";
import { AxiosError } from "axios";
import { IGetAllUsersParams, IGetAllWorkersParams, Iservice } from "../../interfaces/admin";



export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async ({pageNumber,isBlocked,searchInput}:IGetAllUsersParams) =>{
        try{
            const {data} = await instance.get(
                `user/api/v1/getAllUsers?`,
                {
                    params:{
                        pageNumber,
                        searchInput,
                        isBlocked
                    }
                }
            )
            console.log(data);
            
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const getAllWorkers = createAsyncThunk(
    "admin/getAllWorkers",
    async ({pageNumber,isBlocked,searchInput,serviceId,pageSize}:IGetAllWorkersParams) =>{
        try{
            const {data} = await instance.get(
                `user/api/v1/getAllWorkers?`,
               {
                params:{
                    pageNumber,
                    pageSize,
                    searchInput,
                    isBlocked,
                    serviceId
                }
               }
            )
            console.log(data);
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const blockUser = createAsyncThunk(
    "admin/blockUser",
    async (email:string) =>{
        try{
            const {data} = await instance.patch(
                `user/api/v1/blockUser?email=${email}`
            )
            console.log(data);
            
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const blockWorker = createAsyncThunk(
    "admin/blockWorker",
    async (email:string) =>{
        try{
            const {data} = await instance.patch(
                `user/api/v1/blockWorker?email=${email}`
            )
            console.log(data);
            
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const unBlockUser = createAsyncThunk(
    "admin/unBlockUser",
    async (email:string) =>{
        try{
            const {data} = await instance.patch(
                `user/api/v1/unBlockUser?email=${email}`
            )
            console.log(data);
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const unBlockWorker = createAsyncThunk(
    "admin/unBlockWorker",
    async (email:string) =>{
        try{
            const {data} = await instance.patch(
                `user/api/v1/unBlockWorker?email=${email}`
            )
            console.log(data);
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const createService = createAsyncThunk(
    "admin/create-service",
    async (serviceDetails:Iservice) =>{
        try{
            const {data} = await instance.post(
                `user/api/v1/create-service`,
                serviceDetails
            )
            console.log(data);
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)
export const getAllServices = createAsyncThunk(
    "admin/get-services",
    async () =>{
        try{
            const {data} = await instance.get(
                `user/api/v1/get-services`
            )
            console.log(data,'data from response');
            return data
        }catch(err){
            const axiosError = err as AxiosError
            console.log(axiosError); 
        }
    }
)