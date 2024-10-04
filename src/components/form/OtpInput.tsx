
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../../redux/store";
import { sendOtp, verifyOtp } from "../../redux/actions/userActions";
import OtpTimer from "./OtpTimer";

type propType = {
  email: string;
  setVerifyButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
};

const OtpInput = ({ email, setEmailVerified, setVerifyButtonClicked }: propType) => {
  const otpInput = useRef<HTMLInputElement>(null);
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    otpInput.current?.focus();
  }, []);

  const handleVerification = async () => {
    const data: any = await dispatch(verifyOtp({ email, otp: otpValue }));
    if (data.payload.data.valid === true) {
      setEmailVerified(true);
      setVerifyButtonClicked(false);
    } else {
      toast.error("Enter Valid Otp");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpValue(e.target.value);
  };

  const handleTimerComplete = () => {
    setOtpExpired(true);
  };

  const handleResendOtp = () => {
    dispatch(sendOtp(email ))
    toast.success("OTP resent successfully!");
    setOtpExpired(false);
    setOtpValue("");
    otpInput.current?.focus();
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 mb-10 p-4 bg-white rounded-lg">
  <h1 className="text-lg md:text-md font-semibold text-gray-800">Enter OTP</h1>
  
  <div className="flex items-center gap-4">
    <input
      ref={otpInput}
      maxLength={4}
      value={otpValue}
      onChange={handleChange}
      className="h-8 w-20  bg-white rounded-xl border px-4 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300 ease-in-out"
      disabled={otpExpired}
    />
    
    {otpExpired ? (
      <button 
        type="button" 
        className="bg-yellow-500 border text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
        onClick={handleResendOtp}
      >
        Resend
      </button>
    ) : (
      <button 
        type="button" 
        className="bg-blue-500 text-white font-semibold py-1 px-4 rounded-xl hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleVerification}
      >
        Verify
      </button>
    )}
  </div>

  {!otpExpired && (
    <div className="mt-4 md:mt-0">
      <OtpTimer initialTime={120} onTimerComplete={handleTimerComplete} />
    </div>
  )}
</div>

  );
};

export default OtpInput;
