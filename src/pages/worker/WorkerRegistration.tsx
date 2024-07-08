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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { IWorkerCredentials } from "../../interfaces/worker";
import { workerSignUp } from "../../redux/actions/workerActions";


const WorkerRegistration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const services = useSelector((state:RootState) => state.admin.services)

  const initialValues = {
    fullname: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    expertiseIn: "",
    experience: "",
    serviceCharge: "",
    about: "",
    gender: "",
    dateOfBirth: "",
    profileImage: null,
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    
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
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    expertiseIn: Yup.string().required("Expertise is required"),
    experience: Yup.number().required("Experience is required"),
    serviceCharge: Yup.number().required("Service charge is required"),
    about: Yup.string().required("About is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth must be less than today")
      .required("Date of birth is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
  });



  const handleSubmit = async(values:any) => {
       const formData = new FormData();
      formData.append("file",values.profileImage!)
      formData.append("upload_preset","ahfj5695")
    console.log('in handle submit');
    console.log(values.profileImage);
         const response =   await axios.post('https://api.cloudinary.com/v1_1/dnue064gc/image/upload',formData)
    const data : IWorkerCredentials= {
      fullname: values.fullname,
      mobileNumber: values.mobileNumber,
      email: values.email,
      password: values.password,
      houseName: values.houseName,
      street: values.street,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      expertiseIn: values.expertiseIn,
      experience: values.experience,
      serviceCharge: values.serviceCharge,
      about: values.about,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      profileImageUrl:response.data.secure_url
    }
    console.log(data);
    dispatch(workerSignUp(data)).then(result=>{
      console.log(result,'----------------------------worker registration result')
      if(result)navigate('/')
    })
  };

  return (
    <div className="h-full overflow-y-auto " 
  
    >
      <div className="top-0 left-0">
        <Logo color="black" />
      </div>
      <h2 className="text-2xl font-bold pt-20 pb-10 mb-6 text-center">
        Worker Registration
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >{({
        
      })=>(
          <Form  >
            <div className="flex flex-wrap gap-6">
              <div className="flex w-full justify-between">
                <div className="w-1/2 px-20 space-y-10">
                  <InputWithIcon
                    title="Full Name"
                    name="fullname"
                    placeholder="Enter your full name"
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
                </div>
                <div className="w-1/2 px-20 space-y-10">
                  <InputWithIcon
                    title="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    icon="📧"
                  />
                  <DateInput
                    title="Date of Birth"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                  />
                  <PasswordInputWithIcon
                    title="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    canEdit
                    icon="🔒"
                  />
                </div>
              </div>
              <div className="flex gap-24 items-center my-10 px-32">
                <FileInput title="Profile Image" name="profileImage" />
                <RadioButton
                  title="Gender"
                  name="gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                />
              <div className="flex flex-col ">
  <label htmlFor="expertiseIn" className="text-black">Expertise In</label>
  <Field
    as="select"
    name="expertiseIn"
    className="sign-up-input w-full bg-white text-black ps-2 border placeholder:text-sm border-yellow-300 h-10"
  >
    <option value="" disabled hidden>Select service</option>
    {services.map((service) => (
      <option key={service.serviceName} value={service.serviceName}>
        {service.serviceName}
      </option>
    ))}
  </Field>
  <ErrorMessage
    name="expertiseIn"
    component="span"
    className="text-sm text-red-500"
  />
</div>
<div className="flex gap-20 mt-10">

                <InputWithIcon
                  title="Experience in years"
                  name="experience"
                  placeholder="Enter your experience"
                  type="number"
                  icon=""
                  />
                <InputWithIcon
                  title="Service Charge"
                  name="serviceCharge"
                  placeholder="Enter your service charge"
                  type="number"
                  icon=""
                  />
                  </div>
              </div>
              <p className="font-semibold ps-[700px] text-2xl text-black">
                Address
              </p>
              <div className="w-full flex justify-between">
                <div className="w-1/2 px-20 space-y-10">
                  <InputWithIcon
                    title="House Name"
                    name="houseName"
                    placeholder="Enter your house name"
                    type="text"
                    icon=""
                  />
                </div>
                <div className="w-1/2 px-20 space-y-10">
                  <InputWithIcon
                    title="Street"
                    name="street"
                    placeholder="Enter your street"
                    type="text"
                    icon=""
                  />
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="w-1/3 px-20 space-y-10">
                  <InputWithIcon
                    title="City"
                    name="city"
                    placeholder="Enter your city"
                    type="text"
                    icon=""
                  />
                </div>
                <div className="w-1/3 px-20 space-y-10">
                  <InputWithIcon
                    title="State"
                    name="state"
                    placeholder="Enter your state"
                    type="text"
                    icon=""
                  />
                </div>
                <div className="w-1/3 px-20 space-y-10">
                  <InputWithIcon
                    title="Pincode"
                    name="pincode"
                    placeholder="Enter your pincode"
                    type="number"
                    icon=""
                  />
                </div>
              </div>
              <div className="pt-10 px-20">
                <TextArea
                  title="About"
                  name="about"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
            <div className="w-full px-56 pb-10 text-center mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500"
              >
                Register
              </button>
            </div>
          </Form> )}
      </Formik>
      <p className="text-sm text-gray-600 text-center mt-4">
        Already Have an Account?{" "}
        <button
          onClick={()=>navigate('/login')}
          className="text-blue-500 underline cursor-pointer focus:outline-none"
        >
          Login
        </button>
      </p>
      <p className="text-sm text-gray-600 text-center mt-4 pb-10">
        By clicking 'Continue', you acknowledge that you have read and accept
        the{" "}
        <a  className="text-blue-500 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a  className="text-blue-500 underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default WorkerRegistration;
