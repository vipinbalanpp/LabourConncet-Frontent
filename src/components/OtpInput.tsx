import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { verifyOtp } from "../redux/actions/userActions";
import toast from "react-hot-toast";

type propType ={
  email:string,
  setVerifyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;

}

const OtpInput = ({email,setEmailVerified,setVerifyButtonClicked}:propType) => {
    const otpInput = useRef<HTMLInputElement>(null);
    const [otpValue, setOtpValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

useEffect(()=>{
    otpInput.current?.focus();      
},[])
const handleVerification = async()=>{
 const data:any =  await dispatch(verifyOtp({ email, otp:otpValue }))
 if(data.payload.data.valid == true){
  setEmailVerified(true)
  setVerifyButtonClicked(false)
 }else{
  toast.error("Enter Valid Otp")
  return;
 }
  console.log(data,"from there I want")
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // if (!/^\d*$/.test(value)) {
    //   e.target.value = value.slice(0, -1);
     
    // }
    // else{
        setOtpValue(value)
        console.log(value)
    // }
  };
    return (
        <div className="flex gap-5">
        <h1 className="text-black ps-6">Enter the OTP send to your email</h1>
        <input ref={otpInput}  maxLength={4}
        onChange={handleChange}
         className="h-8 w-20 border bg-white   border-yellow-300 ps-2 text-black"></input>
            {otpValue.length === 4 && <button className="text-black" onClick={()=>handleVerification()}>verify</button>}
      </div>
     
    )
}

export default OtpInput
