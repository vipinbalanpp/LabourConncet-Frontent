import { Field, ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";
import OtpInput from "./OtpInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { sendOtp } from "../../redux/actions/userActions";


interface FormValues {
  [key: string]: string;
}
type InputWithIconType = {
  title: string;
  name: string;
  icon: string;
  placeholder: string;
  type: string;
  onchange:(value:string)=>void
  setEmailVerified:(value:string)=>void
};

const EmailInput = ({ title, name, icon, placeholder, type,onchange ,setEmailVerified}: InputWithIconType) => {
  const[verifyButtonClicked,setVerifyButtonClicked] = useState(false)
  const { values } = useFormikContext<FormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const handleVefifyButtonClicked = () => {
    console.log(values[name]);
    dispatch(sendOtp(values[name]))
    setVerifyButtonClicked(true)
  }
   
  return (
    <div className="mb-5">
      <p>
        <label className="text-black ps-5" >{title}</label>
      </p>
      <div className="relative flex items-center">
  <div className="absolute left-2 top-2/4 transform -translate-y-2/4">
    {icon}
  </div>
  <Field
    name={name}
    type={type}
    placeholder={placeholder}
    validate={onchange}
    className="sign-up-input w-full bg-white text-black ps-10 border placeholder:text-sm border-yellow-300 h-10 pr-16"
  />
  <button 
  onClick={handleVefifyButtonClicked}
  type="button" className="absolute right-2 top-2/4 transform -translate-y-2/4  text-yellow-400 py-2 px-4 rounded">
    Verify
  </button>
</div>

      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    {verifyButtonClicked && (
     <div className="mt-4">
       <OtpInput email="vipinbalanpp@gmail.com" setEmailVerified={setEmailVerified}/>
     </div>
    )}
    </div>
  );
};

export default EmailInput;
