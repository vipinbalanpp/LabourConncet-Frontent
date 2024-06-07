// src/components/OtpInput.js

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
    <div className="flex  items-center gap-5 mb-10">
      <h1 className="text-black ps-6">Enter OTP</h1>
      <input
        ref={otpInput}
        maxLength={4}
        value={otpValue}
        onChange={handleChange}
        className="h-8 w-20 border bg-white border-yellow-300 ps-2 text-black"
        disabled={otpExpired}
      />
      {otpExpired ? (
        <button className="text-black" onClick={handleResendOtp}>
          Resend
        </button>
      ) : (
         (
          <button className="text-black" onClick={handleVerification}>
            Verify
          </button>
        )
      )}
     {!otpExpired && <OtpTimer initialTime={120} onTimerComplete={handleTimerComplete} />} 
     
    </div>
  );
};

export default OtpInput;
