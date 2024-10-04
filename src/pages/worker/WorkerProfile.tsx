import { useEffect, useState } from "react";
import Work from "../../components/worker/Work";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { Box, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import instance from "../../config/axiozConfig";
import { IEditWorkerDetails } from "../../interfaces/worker";
import UnAvailabilityDatePicker from "../../components/worker/UnAvaliabilityDatePicker";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUserData } from "../../redux/actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginInfo from "../../components/public/LoginInfo";
import { format } from "date-fns";

const WorkerProfile = () => {
  const [profileInfo, setProfileInfo] = useState("profile");
  const dispatch = useDispatch<AppDispatch>();
  const [editModal, setEditModal] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [errors, setErrors] = useState({});
  const [editAddressModalIsOpen, setEditAddressModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    mobileNumber: user?.mobileNumber || null,
    dateOfBirth: user?.dateOfBirth || null,
    expertiseIn: user?.expertiseIn || null,
    experience: user?.experience || null,
    serviceCharge: user?.serviceCharge || null,
    about: user?.about || null,
  });
  const [addressFromData, setAddressFromData] = useState({
    houseName: null,
    street: null,
    city: null,
    state: null,
    pincode: null,
  });
  useEffect(() => {
    if (user?.address) {
      setAddressFromData(user.address);
    }
  }, [dispatch]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFormData = (formData: IEditWorkerDetails) => {
    let newErrors = {};
    if (
      !formData.fullName ||
      formData.fullName.length < 3 ||
      formData.fullName.length > 30
    ) {
      newErrors.fullName =
        "Fullname should be less than 30 characters and more than 2 characters";
    }
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number should be exactly 10 digits";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (
      !formData.expertiseIn ||
      formData.expertiseIn.length < 3 ||
      formData.expertiseIn.length > 30
    ) {
      newErrors.expertiseIn =
        "Expertise should be less than 30 characters and more than 2 characters";
    }
    if (!formData.experience || formData.experience.length < 1) {
      newErrors.experience = "Experience is required";
    }
    if (!formData.serviceCharge || isNaN(Number(formData.serviceCharge))) {
      newErrors.serviceCharge = "Service charge must be a valid number";
    }
    if (
      !formData.about ||
      formData.about.length < 3 ||
      formData.about.length > 500
    ) {
      newErrors.about =
        "About should be less than 200 characters and more than 2 characters";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChangeProfileImage = () => {
    console.log(image, "--------->image from profjdlsfjlasdfj");
    const imageFormData = new FormData();
    imageFormData.append("file", image!);
    imageFormData.append("upload_preset", "ahfj5695");
    const imageResponse = axios.post(
      "https://api.cloudinary.com/v1_1/dnue064gc/image/upload",
      imageFormData
    );
    imageResponse.then((result) => {
      const response = instance.put(
        `/user/api/v1/edit-profileImage?profileImageUrl=${result.data.secure_url}`
      );
      response.then((result) => {
        console.log(result);
        setImage(null);
        toast.success(result.data);
        dispatch(fetchUserData());
      });
    });
  };
  const handleEditAddressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(addressFromData);
    const response = instance.post(
      "/user/api/v1/edit-address",
      addressFromData
    );
    response.then((result) => {
      dispatch(fetchUserData());
      toast.success(result.data);
      setEditAddressModalIsOpen(false);
    });
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData, "this is form data");

    const errors = validateFormData(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Form errors:", errors);
      return;
    }
    const data = instance.put("/user/api/v1/edit-worker", formData);
    data.then((result) => {
      dispatch(fetchUserData());
      console.log(result, "this is result after editing");
    });

    console.log(formData);
    setEditModal(false);
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        setAddressError("Pincode must be  6 digits.");
      } else {
        setAddressError(null);
        setAddressFromData({ ...addressFromData, [name]: value });
        return;
      }
    }
    if (addressError) return;
    setAddressFromData({ ...addressFromData, [name]: value });
  };
  const handleTabChange = (event, newValue) => {
    setProfileInfo(newValue);
  };

  return (
    <>
      <div className="flex">
        <div className="min-h-screen mt-10">
        <Tabs
      value={profileInfo}
      onChange={handleTabChange}
      aria-label="secondary"
    >
       <Tab
        value="profile"
        label="My Profile"
        className="font-bold text-yellow-600 hover:text-yellow-600 focus:text-yellow-600 transition-colors duration-200"
      />
      <Tab
        value="login-info"
        label="Login Info"
        className="font-bold text-yellow-600 hover:text-yellow-600 focus:text-yellow-600 transition-colors duration-200"
      />
      <Tab
        value="availability"
        label="Availability"
        className="font-bold text-yellow-600 hover:text-yellow-600 focus:text-yellow-600 transition-colors duration-200"
      />
      <Tab
        value="work"
        label="Works"
        className="font-bold text-yellow-600 hover:text-yellow-600 focus:text-yellow-600 transition-colors duration-200"
      />
    </Tabs>
  {/* <button 
onClick={() => setProfileInfo('profile')}
  className={`px-4  font-bold   me-1  rounded transition-colors duration-300 ${profileInfo === 'profile' ? 'border-b-4 border-yellow-500':''}`}>
 MY PROFILE
  </button>
  <button
onClick={() => setProfileInfo('login-info')}
  className={`px-4   font-bold  me-1  rounded transition-colors duration-300 ${profileInfo === 'login-info' ? 'border-b-4 border-yellow-500':''}`}>
   LOGIN INFO
    </button>
  <button
onClick={() => setProfileInfo('availability')}
  className={`px-4  font-bold  me-1  rounded transition-colors duration-300 ${profileInfo === 'availability' ? 'border-b-4 border-yellow-500':''}`}>
    AVAILABILITY
    </button>
  <button 
  onClick={() => setProfileInfo('works')}
  className={`px-4   font-bold   me-1  rounded transition-colors duration-300 ${profileInfo === 'works' ? 'border-b-4 border-yellow-500':''}`}>
    WORKS
    </button> */}


          {profileInfo === "profile" ? (
            <div>
              <div className="flex gap-56 pt-20">
                <div>
                  <p className="font-bold">Full Name</p>
                  <p className="text-black">{user?.fullName}</p>
                </div>
                <div>
                  <p className="font-bold">Gender</p>
                  <p className="text-black">{user?.gender}</p>
                </div>
              </div>
              <div className="flex gap-56 pt-10">
                <div>
                  <p className="font-bold">Mobile</p>
                  <p className="text-black">{ user?.mobileNumber}</p>
                </div>
                <div>
                  <p className="font-bold">Date Of Birth</p>
                  <p className="text-black">{format(new Date(user?.dateOfBirth),"PPP")}</p>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-black">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-56 pt-5">
                <div>
                  <p className="font-bold">Experience</p>
                  <p className="text-black">{user?.experience} years</p>
                </div>

                <div className="">
                  <p className="font-bold">Service charge</p>
                  <p className="text-black">₹ {user?.serviceCharge} per hour</p>
                </div>
              </div>
              <div className="mt-10">
                <p className="font-bold">About</p>
                <p className="pe-32 text-black">{user?.about}</p>
              </div>

              <button
                className="text-yellow-500 ps-96"
                onClick={() => setEditModal(true)}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-gray-500 pe-2"
                  />
                </span>
                edit profile details
              </button>
              <hr className="me-10 mt-10" />
              <div className="flex">
                <div className="pt-10">
                  <p className="font-bold">Address</p>
                  <p className="text-black pt-5">
                    {user?.address.houseName},{user?.address.street} <br />{" "}
                    {user?.address.city},{user?.address.state}-
                    {user?.address.pinCode}
                  </p>
                  <button
                    className="text-yellow-500 mt-3"
                    onClick={() => setEditAddressModalIsOpen(true)}
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 pe-2"
                      />
                    </span>
                    Edit
                  </button>
                </div>
                <div className="ps-56 pt-10">
                  <div className="relative flex items-center justify-center w-40 h-40 border  border-red-600 shadow-2xl bg-white overflow-hidden mt-1">
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded"
                        className="object-cover border-red-600 w-full h-full"
                      />
                    ) : user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="Uploaded"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C9.51472 4.5 7.5 6.51472 7.5 9C7.5 11.4853 9.51472 13.5 12 13.5C14.4853 13.5 16.5 11.4853 16.5 9C16.5 6.51472 14.4853 4.5 12 4.5ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z" />
                        <path d="M21 19.5C21 18.6716 20.3284 18 19.5 18H4.5C3.67157 18 3 18.6716 3 19.5C3 19.7757 3.22428 20 3.5 20H20.5C20.7757 20 21 19.7757 21 19.5Z" />
                      </svg>
                    )}
                    <input
                      type="file"
                      name="profileImageUrl"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  {!image && (
                    <p className="text-black text-sm pt-2">
                      By clicking on the image you can change your profile
                      image...
                    </p>
                  )}
                  {image && (
                    <button
                      className="text-white px-3 py-1 mt-5 rounded-xl ms-9 bg-yellow-500"
                      onClick={() => handleChangeProfileImage()}
                    >
                      Save Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : profileInfo === "login-info" ? (
            <LoginInfo />
          ) : profileInfo === "availability" ? (
            <div className="mt-20">
              <UnAvailabilityDatePicker />
            </div>
          ) : (
            <div className="p-10 ">
              <div className="flex justify-center">
                <button className="text-yellow-500">Add new Work</button>
              </div>
              <div className="flex gap-10 mt-10">
                <Work />
                <Work />
                <Work />
              </div>
            </div>
          )}
        </div>
      </div>
      <ReactModal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        className="fixed inset-0 flex items-center justify-center z-50 py-5"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Box className="bg-white rounded-lg p-11 w-full max-w-3xl h-full  shadow-lg overflow-y-auto scrollbar-hide">
          <h2 className="text-xl text-center text-black font-semibold mb-4">
            Edit Profile Details
          </h2>
          <form onSubmit={handleEditFormSubmit}>
            <div className="flex justify-center"></div>
            <label className="text-black">Fullname</label>
            <input
              type="text"
              name="fullName"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder={user?.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <p className="text-red-500 mb-4 text-sm">
                fullname should be less than 30 characters and more than 2
                characters
              </p>
            )}
            <label className="text-black">MobileNumber</label>
            <input
              type="text"
              name="mobileNumber"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder={user?.mobileNumber}
              onChange={handleInputChange}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 mb-4 text-sm">
                enter a valid mobile number
              </p>
            )}

            <label className="text-black">Date of birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder={user?.dateOfBirth}
              onChange={handleInputChange}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 mb-4 text-sm">
                enter valid date of birth
              </p>
            )}

            <div className="flex gap-5">
              <div>
                <label className="text-black">Expertise in</label>
                <input
                  type="text"
                  name="expertiseIn"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.expertiseIn}
                  onChange={handleInputChange}
                />
                {errors.expertiseIn && (
                  <p className="text-red-500 mb-4 text-sm">
                    enter valid service
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.experience}
                  onChange={handleInputChange}
                />
                {errors.experience && (
                  <p className="text-red-500 mb-4 text-sm">
                    enter valid number of years of experience
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Service charge per hour</label>
                <input
                  type="text"
                  name="serviceCharge"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.serviceCharge}
                  onChange={handleInputChange}
                />
                {errors.serviceCharge && (
                  <p className="text-red-500 mb-4 text-sm">enter valid input</p>
                )}
              </div>
            </div>
            <label className="text-black">About</label>
            <textarea
              name="about"
              className="bg-white w-full h-[200px] border text-black border-yellow-400 p-2 m-2"
              placeholder={user?.about}
              onChange={handleInputChange}
              style={{ verticalAlign: "top" }}
            ></textarea>
            {errors.about && (
              <p className="text-red-500 mb-4 text-sm">
                about should be less than 450 characters
              </p>
            )}

            <div className="flex justify-end gap-3 mt-4 space-x-2">
              <button
                className="text-black rounded-xl"
                onClick={() => setEditModal(false)}
              >
                cancel
              </button>
              <button type="submit" className=" rounded-xl text-yellow-500">
                confirm
              </button>
            </div>
          </form>
        </Box>
      </ReactModal>
      <ReactModal
        isOpen={editAddressModalIsOpen}
        onRequestClose={() => setEditAddressModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 py-5"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Box className="bg-white rounded-lg p-11 w-1/2  shadow-lg ">
          <h2 className="text-xl text-center text-black font-semibold mb-4">
            Edit Address
          </h2>
          <form onSubmit={handleEditAddressSubmit}>
            <div className="">
              {user?.address && (
                <>
                  <label className="text-black">HouseName</label>
                  <input
                    type="text"
                    name="houseName"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={user?.address.houseName}
                    onChange={handleAddressInputChange}
                  />
                  <label className="text-black">Street</label>
                  <input
                    type="text"
                    name="street"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={user?.address.street}
                    onChange={handleAddressInputChange}
                  />
                  <label className="text-black">City</label>
                  <input
                    type="text"
                    name="city"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={user?.address.city}
                    onChange={handleAddressInputChange}
                  />
                  <label className="text-black">State</label>
                  <input
                    type="text"
                    name="state"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={user?.address.state}
                    onChange={handleAddressInputChange}
                  />
                  <label className="text-black">Pincode</label>
                  <input
                    type="number"
                    name="pincode"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={user?.address.pincode}
                    onChange={handleAddressInputChange}
                  />
                </>
              )}
              {addressError && <p className="text-red-600">{addressError}</p>}

              <div className="flex justify-end gap-3 mt-4 space-x-2">
                <button
                  className="text-black rounded-xl"
                  onClick={() => setEditAddressModalIsOpen(false)}
                >
                  cancel
                </button>
                <button type="submit" className=" rounded-xl text-yellow-500">
                  confirm
                </button>
              </div>
            </div>
          </form>
        </Box>
      </ReactModal>
    </>
  );
};

export default WorkerProfile;
