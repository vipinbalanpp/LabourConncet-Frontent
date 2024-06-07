import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleError = async(
    error:AxiosError,
    rejectWithValue:( value : string | unknown) =>string | unknown
)=>{
    if(error.response && error.response.data){
        console.log(error.response.data);
        
        toast.error(error.response.data)
        return rejectWithValue(error.response.data)
    }
}