import { useDebugValue, useState } from "react";
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
import { login } from "../redux/actions/userActions";

Modal.setAppElement("#root");

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
      if(result.payload.data)
        navigate('/')
    })
    
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleRegister = (type: string) => {
    if (type === "client") {
      navigate("/user-register");
    } else if (type === "worker") {
      navigate("/worker-register");
    }
    setShowModal(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-32">
        <div className="absolute top-0 left-0">
          <Logo color='black' />
        </div>
        <img
          className="h-full w-full object-cover"
          src={image}
          alt="Blue collar workers"
        />
        <p className="text-black text-xs">
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
                  className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 "
                >
                  Continue
                </button>
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 mb-6 bg-white text-black border border-yellow-300 font-semibold rounded-lg  hover:text-black hover:border-black flex items-center justify-center"
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
              </Form>
            )}
          </Formik>
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
