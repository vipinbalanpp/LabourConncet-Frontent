import { Formik, Form } from "formik";
import image from "../assets/blue-collar-workers.jpg";
import InputWithIcon from "../components/InputWithIcon";
import Logo from "../components/Logo";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import PasswordInputWithIcon from "../components/PasswordInput";
import { useDispatch } from "react-redux";
import { sendOtp, userSignUp } from "../redux/actions/userActions";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { AppDispatch } from "../redux/store";
import OtpInput from "../components/OtpInput";
import toast from "react-hot-toast";

const ClientRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [verifyButtonClicked,setVerifyButtonClicked] = useState(false)
  const [emailVerified,setEmailVerified] = useState(false);
  const  [emailValue,setEmailValue] = useState("")
  


 

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values: { fullName:string; password: string; email: string; confirmPassword: string }) => {
       console.log(values)
    let formData = {
      "fullName" : values.fullName,
      "email":values.email,
      "password":values.password,
      "role":"USER"
    }
  if(!emailVerified){
      toast.error("Email not verified")
  }
    console.log(formData)
    dispatch(userSignUp(formData));
  };
  function isValidEmail(email:string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const handleVerifyEmailButtonClicked = ()=>{
  if(!isValidEmail(emailValue)){
    return
  }
  setVerifyButtonClicked(true)
   dispatch(sendOtp(emailValue))
  console.log(initialValues);
}
  const handleGoogleLogin = () => {
    console.log("Google login");
   
  };

  const handleLogin = () => {
    navigate("/login");
  };
 

  return (
    <div className="flex h-screen">
     
      <div className="w-1/2 p-32">
        <div className="absolute top-0 left-0">
          <Logo />
        </div>
        <img
          className="h-full w-full object-cover"
          src={image}
          alt="Blue collar workers"
        />
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center relative">
     {!verifyButtonClicked && !emailVerified && <button className="absolute ms-[570px] mt-[-260px] text-yellow-500" onClick={handleVerifyEmailButtonClicked}>verify</button>}
     
     {emailVerified &&     <h1 className="absolute ms-[570px] mt-[-280px] text-green-500"> verified </h1>}
  
        <div className="w-full max-w-lg">
          <h2 className="text-2xl text-black font-semibold mb-6 text-center">
            Client Registration
          </h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, resetForm, values,setFieldValue }) => (
              <Form className="space-y-6" onSubmit={handleSubmit}>
               
                <InputWithIcon
                  name="fullName"
                  title="Full Name"
                  icon="👤"
                  placeholder="Enter your Full Name"
                  type="text"

                
      
                />
                { }
                <InputWithIcon
                  name="email"
                  title="Email"
                  icon="📧"
                  placeholder="Enter your email"
                  type="text"
                  onchange={(value:string)=>{
                    setEmailValue(value);
                  }}
                />
             
                
             {verifyButtonClicked && <OtpInput email={emailValue} setEmailVerified={setEmailVerified} setVerifyButtonClicked={setVerifyButtonClicked} />}
               
                <PasswordInputWithIcon
                  name="password"
                  title="Password"
                  icon="🔒"
                  placeholder="Enter your password"
                  canEdit
                />
                <PasswordInputWithIcon
                  name="confirmPassword"
                  title="Confirm Password"
                  icon="🔒"
                  placeholder="Confirm your password"
                  canEdit
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500"
                >
                 Register
                </button>
              </Form>
            )}
          </Formik>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-5 py-3 mb-6 bg-white text-black border border-yellow-300 font-semibold rounded-lg hover:border-black flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.09 0 5.9 1.06 8.13 2.83l6.09-6.09C34.59 3.45 29.63 1.5 24 1.5 14.53 1.5 6.8 6.55 3.15 14.12l7.29 5.66C12.31 13.08 17.69 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24c0-1.61-.14-3.18-.4-4.69H24v9.38h12.69c-.56 2.98-2.19 5.51-4.62 7.19l7.28 5.66C43.94 37.6 46.5 31.21 46.5 24z"
              />
              <path
                fill="#FBBC05"
                d="M10.43 28.22C9.53 26.56 9 24.58 9 22.5s.53-4.06 1.43-5.72l-7.28-5.66C1.55 14.25 0 18.22 0 22.5s1.55 8.25 4.15 11.38l7.28-5.66z"
              />
              <path
                fill="#34A853"
                d="M24 46.5c6.47 0 11.89-2.13 15.84-5.76l-7.28-5.66C29.31 37.19 27 37.5 24 37.5c-6.31 0-11.69-3.58-14.32-8.88l-7.29 5.66C6.8 41.45 14.53 46.5 24 46.5z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Continue with Google
          </button>
          <p className="text-sm text-gray-600 text-center mt-4">
            Already Have an Account?{" "}
            <button
              onClick={handleLogin}
              className="text-blue-500 underline cursor-pointer focus:outline-none"
            >
              Login
            </button>
          </p>
          <p className="text-sm text-gray-600 text-center mt-4 p-2">
            By clicking 'Continue', you acknowledge that you have read and
            accept the{" "}
            <a href="/terms" className="text-blue-500 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
