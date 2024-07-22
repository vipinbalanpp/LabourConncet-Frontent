import { useState } from "react";
import { Formik, Form } from "formik";
import image from "../assets/blue-collar-workers.jpg";
import InputWithIcon from "../components/form/InputWithIcon";
import * as Yup from "yup";
import Logo from "../components/public/Logo";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import PasswordInputWithIcon from "../components/form/PasswordInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchUserData, login } from "../redux/actions/userActions";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import instance from "../config/axiozConfig";
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from "../interfaces/user";


const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
    const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Enter email "),
   password:Yup.string().required("Enter Password")
  });
  
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(values,'on submit');
     dispatch(login(values)).then(result=>{
      console.log(result,'from login page');
      if(result.payload.data){
        dispatch(fetchUserData())
        navigate('/')
      }
    }).catch(error=>{
      toast.error(error)
    })
    
  };
  const handleGooleLogin = async(credentialResponse:any) => {
    try{
      console.log(credentialResponse);
      const decodedToken:DecodedToken = jwtDecode(credentialResponse.credential)
      console.log('Decoded Token:', decodedToken);
    
    const response = await instance.post('/auth/api/v1/googleAuth',
      { fullName:decodedToken.name,
        email:decodedToken.email,
        passoword:''
      }
    )
    console.log(response);
    navigate('/')
    dispatch(fetchUserData())
    }catch(error){
      console.log(error,'this is error');
      
    }
    
    
  }


  const handleRegister = (type: string) => {
    if (type === "client") {
      navigate("/user-register");
    } else if (type === "worker") {
      navigate("/worker-register");
    }
    setShowModal(false);
  };

  return (
    <div className="md:flex h-screen">
      <div className="w-1/2 md:p-32 ">
        <div className="md:absolute top-0 left-0">
          <Logo color='black' />
        </div>
        <img
          className="h-full w-full hidden md:block object-cover"
          src={image}
          alt="Blue collar workers"
        />
        <p className="text-black text-xs hidden md:block">
          Discover convenience like never before. Sign in to explore our
          platform and connect with skilled hands for your service
          requirements...
        </p>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center relative">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl text-black font-semibold mb-6 text-center">
            Welcome Back
          </h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-6">
                <InputWithIcon
                  name="email"
                  title="Email"
                  icon="👤"
                  placeholder="Enter your email id"
                  type="text"
                />
                <PasswordInputWithIcon
                  name="password"
                  title="Password"
                  icon="🔒"
                  placeholder="Enter your password"
                  canEdit
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400  text-white font-semibold  hover:bg-yellow-500 "
                >
                  Sign In
                </button>
              
              </Form>
            )}
          </Formik>
               <div className="mt-10 md:flex justify-center ">
               <GoogleLogin  onSuccess={(credentialResponse)=>{handleGooleLogin(credentialResponse);
                }} onError={() => {console.log('Login failed');
                }}/>
               </div>
                <p className="text-sm text-gray-600 text-center mt-4">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-blue-500 underline cursor-pointer focus:outline-none"
                  >
                    Register
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
     
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <h2 className="text-xl font-semibold mb-4">
                Choose Registration Type
              </h2>
              <button
                onClick={() => handleRegister("client")}
                className="w-full py-2 mb-4 bg-gray-300 text-black hover:text-white font-semibold rounded-lg hover:bg-yellow-400"
              >
                Register as Client
              </button>
              <button
                onClick={() => handleRegister("worker")}
                className="w-full py-2 bg-gray-300 text-black hover:text-white font-semibold rounded-lg hover:bg-yellow-400"
              >
                Register as Worker
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
