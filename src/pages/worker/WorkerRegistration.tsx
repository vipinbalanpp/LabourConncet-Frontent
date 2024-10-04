import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextArea from "../../components/form/TextArea";
import RadioButton from "../../components/form/RadioButton";
import FileInput from "../../components/form/FileInput";
import DateInput from "../../components/form/DateInput";
import Logo from "../../components/public/Logo";
import InputWithIcon from "../../components/form/InputWithIcon";
import PasswordInputWithIcon from "../../components/form/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import axios from "axios";
import { IWorkerCredentials } from "../../interfaces/worker";
import { workerSignUp } from "../../redux/actions/workerActions";
import { useEffect, useState } from "react";
import { Iservice } from "../../interfaces/admin";
import instance from "../../config/axiozConfig";
import toast from "react-hot-toast";
import { sendOtp } from "../../redux/actions/userActions";
import OtpInput from "../../components/form/OtpInput";

const WorkerRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [services, setServices] = useState<Iservice[]>([]);
  const [emailVerified,setEmailVerified] = useState(false);
  const [verifyButtonClicked,setVerifyButtonClicked] = useState(false)
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    const serviceResponse = await instance.get(`service/api/v1/services`);
    if (serviceResponse) {
      setServices(serviceResponse.data);
    }
  };

  const initialValues = {
    fullname: "",
    username:"",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    serviceId: null,
    experience: "",
    serviceCharge: "",
    about: "",
    gender: "",
    dateOfBirth: "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    username: Yup.string().required('Username is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    houseName: Yup.string().required("House name is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    expertiseIn: Yup.number().required("Select a service"),
    experience: Yup.number().required("Experience is required"),
    serviceCharge: Yup.number().required("Service charge is required"),
    about: Yup.string().required("About is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth must be less than today")
      .required("Date of birth is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
  });

  const handleSubmit = async (values: any) => {
   
    const formData = new FormData();
    formData.append("file", values.profileImage!);
    formData.append("upload_preset", "ahfj5695");
    
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dnue064gc/image/upload",
      formData
    );

    const data: IWorkerCredentials = {
      fullName: values.fullname,
      username:values.username,
      mobileNumber: values.mobileNumber,
      email: values.email,
      password: values.password,
      houseName: values.houseName,
      street: values.street,
      city: values.city,
      state: values.state,
      pinCode: values.pinCode,
      serviceId: values.expertiseIn,
      experience: values.experience,
      serviceCharge: values.serviceCharge,
      about: values.about,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      profileImageUrl: response.data.secure_url,
    };
    if(!emailVerified){
      toast.error('Email not verified');
      return;
    }
    dispatch(workerSignUp(data)).then((result) => {
      if (result) navigate("/");
    });    
    console.log(data,'-----------<data>');
    
  };
  const handleVerifyEmailButtonClicked = async () => { 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        toast.error('Enter email Id')
        return;
    }
    if (!emailRegex.test(emailValue)) {
      toast.error('Enter valid email id')
      return;
  }
    const response = await dispatch(sendOtp(emailValue));
    if(response.meta.requestStatus !== "rejected")
    setVerifyButtonClicked(true);
  };

  return (
    <>
      <Logo color="black" />
      <div className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-20 bg-gray-100 relative">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">Worker Registration</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithIcon
                    title="Full Name"
                    name="fullname"
                    placeholder="Enter your full name"
                    type="text"
                    icon="👤"
                   
                  />
                   <InputWithIcon
                    title="Username"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                    icon="👤"
                   
                  />
                  <InputWithIcon
                    title="Mobile Number"
                    name="mobileNumber"
                    placeholder="Enter your mobile number"
                    type="number"
                    icon="📱"
                    
                  />
                  <PasswordInputWithIcon
                    title="Password"
                    name="password"
                    placeholder="Enter your password"
                    canEdit
                    icon="🔒"
                  
                  />
                  <PasswordInputWithIcon
                    title="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    canEdit
                    icon="🔒"
                   
                  />
              <div className="flex">
           <div className="w-[850px]">
           <InputWithIcon
                    title="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    icon="📧"
                    onchange={(value: string) => {
                      console.log(value, "value of email");
                      setEmailValue(value);
                    }}
                   
                  />
           </div>
                  <div>
                  {!verifyButtonClicked && !emailVerified && (
          <button
          type="button"
            className="mt-8 ms-2 text-yellow-500"
            onClick={handleVerifyEmailButtonClicked}
          >
            verify
          </button>
        )}
        {emailVerified &&  <p className=" font-semibold text-sm mt-8 ms-2 text-green-400 " >Verified</p>}
                 
                  </div>
              </div>
                   {verifyButtonClicked && (
                    <>
                    <div></div>
                    <div className="">
                      <OtpInput
                       email={emailValue}
                       setEmailVerified={setEmailVerified}
                       setVerifyButtonClicked={setVerifyButtonClicked}
                     />
                    </div></>
                   )}
          
                 
                </div>

                <div className="flex flex-col md:flex-row md:justify-between items-center md:gap-44 gap-10 mb-6">
                  <FileInput title="Profile Image" name="profileImage"  />
                  <RadioButton
                    title="Gender"
                    name="gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                  
                  />
                <div className="w-full">
                <DateInput
                    title="Date of Birth"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                 
                  />
                </div>
                </div>

                <p className="font-semibold text-center text-2xl mb-6 text-black">Address</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputWithIcon
                    title="House Name"
                    name="houseName"
                    placeholder="Enter your house name"
                    type="text"
                   icon=""
                  />
                  <InputWithIcon
                    title="Street"
                    name="street"
                    placeholder="Enter your street"
                    type="text"
                   icon=""
                  />
                  <InputWithIcon
                    title="City"
                    name="city"
                    placeholder="Enter your city"
                    type="text"
                 icon=""
                  />
                  <InputWithIcon
                    title="State"
                    name="state"
                    placeholder="Enter your state"
                    type="text"
                 icon=""
                  />
                  <InputWithIcon
                    title="Pincode"
                    name="pinCode"
                    placeholder="Enter your pincode"
                    type="number"
                  icon=""
                  />
                </div>

                <p className="font-semibold text-center text-2xl mb-6 text-black">Service Detail</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="w-full">
                    <label htmlFor="expertiseIn" className="block text-black mb-1">Expertise In</label>
                    <Field
                      as="select"
                      name="expertiseIn"
                      className="w-full bg-white text-black border border-yellow-300 h-10 px-2 rounded-md"
                    >
                      <option value="" disabled hidden>Select service</option>
                      {services.map((service) => (
                        <option key={service.serviceId} value={service.serviceId}>
                          {service.serviceName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="expertiseIn" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                  <InputWithIcon
                    title="Experience in years"
                    name="experience"
                    placeholder="Enter your experience"
                    type="number"
                   icon=""
                  />
                  <InputWithIcon
                    title="Service Charge Per Hour"
                    name="serviceCharge"
                    placeholder="Enter your service charge"
                    type="number"
                  icon=""
                  />
                </div>

                <div className="mb-6">
                  <TextArea
                    title="About"
                    name="about"
                    placeholder="Tell us about yourself"
                  
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition duration-200"
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 underline"
            >
              Login
            </button>
          </p>
          <p className="text-sm text-gray-600 text-center mt-4 pb-10">
            By clicking 'Continue', you acknowledge that you have read and accept
            the <a href="#" className="text-blue-500 underline">Terms of Service</a> and{" "}
            <a href="#" className="text-blue-500 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkerRegistration;
