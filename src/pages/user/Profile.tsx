import { useEffect, useState } from "react";
import Footer from "../../components/public/Footer";
import UserSidebar from "../../components/user/UserSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box } from "@mui/material";
import ReactModal from "react-modal";
import instance from "../../config/axiozConfig";
import toast from "react-hot-toast";
import { fetchUserData } from "../../redux/actions/userActions";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import LoginInfo from "../../components/public/LoginInfo";

const Profile = () => {
  const [profileActive, setProfileActive] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const [editAddressModalIsOpen, setEditAddressModalIsOpen] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [image,setImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [fullName,setFullName] = useState<string | null>(null)
  const [fullNameError,setFullNameError] = useState<string | null>(null)
  const [editFullNameInput,setEditFullNameInput] = useState(false)
  const [addAdrressModalIsOpen,setAddAdrressModalIsOpen] = useState(false)
  const [addressFromData, setAddressFromData] = useState({
    houseName:  "",
    street: '',
    city:'',
    state: '',
    pinCode: '',
  });
  useEffect(() =>{
      if(user?.address){
        setAddressFromData(user.address)
      }
  },[dispatch])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
      if(name === 'pinCode') {
        if (!/^\d{6}$/.test(value)) {
          setAddressError('Pincode must be  6 digits.') 
        }else{
          setAddressError(null)
          setAddressFromData({ ...addressFromData, [name]: value });
          return
        }
      }
    if(addressError) return
    setAddressFromData({ ...addressFromData, [name]: value });
  };


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

const handleEditAddressSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log(addressFromData);
    const response = instance.post('/user/api/v1/edit-address',addressFromData);
    response.then((result) =>{
      dispatch(fetchUserData())
      toast.success(result.data);
      setEditAddressModalIsOpen(false)
    })
    
}

const handleAddAddressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  console.log(addressFromData);
  event.preventDefault();
  const response = instance.post('/user/api/v1/add-address',addressFromData);
  response.then((result) =>{
    dispatch(fetchUserData())
    toast.success(result.data);
    setEditAddressModalIsOpen(false)
  })
}
 
const handleFullNameChange = () =>{
  const trimmedFullName = fullName?.trim();

  if (trimmedFullName) {
    if (trimmedFullName.length < 3 || trimmedFullName.length > 30) {
      setFullNameError("Fullname should be having greater than 2 characters and less than 30 characters");
      return
    } else {
      const response = instance.put(`/user/api/v1/edit-fullName?fullName=${fullName}`)
      response.then((result)=>{
        dispatch(fetchUserData())
        toast.success(result.data);
      })
      .catch((error) => {
        toast.error(error.message || 'An error occurred');
      });
      setFullNameError(null);
      setEditFullNameInput(false)

    }
  } else {
    setFullNameError("Fullname cannot be blank");
    return
  }
}

const handleChangeProfileImage = () =>{
  console.log(image,'--------->image from profjdlsfjlasdfj');
  const imageFormData = new FormData();
  imageFormData.append("file",image!)
  imageFormData.append("upload_preset","ahfj5695")
  const imageResponse =  axios.post('https://api.cloudinary.com/v1_1/dnue064gc/image/upload',imageFormData)
  imageResponse.then((result) =>{
    const response = instance.put(`/user/api/v1/edit-profileImage?profileImageUrl=${result.data.secure_url}` )
    response.then((result) =>{
      console.log(result);
      setImage(null)
      toast.success(result.data)
      dispatch(fetchUserData())
      
    })
  })
}
  return (
    <>
    
        <div className=" pt-28 px-28 w-full">
          <div className="flex gap-5">
            <p
              onClick={() => setProfileActive(true)}
              className={`cursor-pointer ${
                profileActive
                  ? "underline decoration-4 text-black decoration-yellow-400"
                  : ""
              }`}
            >
              My Profile
            </p>
            <p
              onClick={() => setProfileActive(false)}
              className={`cursor-pointer ${
                profileActive
                  ? ""
                  : "underline decoration-4 text-black decoration-yellow-400"
              }`}
            >
              Login Details
            </p>
          </div>
          {profileActive ? (
            <div>
                <div className="pt-20 flex">
                <div>
                <p className="text-black font-semibold text-lg">
                    Profile Information
                  </p>
                  <p className="pt-2 text-black">
                    This is profile information that you can update anytime.
                  </p>
                  <div className="flex pt-10">

                 {!editFullNameInput && (
                  <>
                   <p className="text-md">Fullname :</p>
                   <p  className="text-black ps-3">{user?.fullName}</p>
                  </>
                 )}
                  {editFullNameInput ? (
                    <>
                      <input type="text" 
                     className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                     placeholder={user?.fullName}
                     onChange={(e) => setFullName(e.target.value)}
                     name = 'fullName'
                     />
                     <button onClick={() => {
                      setEditFullNameInput(false)
                      setFullNameError(null)
                     }} className="px-2">cancel</button>
                      <button
                      onClick={() => handleFullNameChange()}
                       className=" text-yellow-400 px-2">Save</button>
                     </>
                  ) :(
                  <button
                      className=" hover:rounded-3xl duration-300 text-yellow-500 px-5  rounded-xl"
                      onClick={()=>setEditFullNameInput(true)}
                    >
                        <span>  
                            <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 pe-2"
                      /></span>
                    </button>

                  )}
                  </div>
                  {fullNameError &&  <p className="text-red-500 text-sm">{fullNameError}</p>}
                 
                </div>
                <div>
                <div className="ps-56">
                  <div className="relative flex items-center justify-center w-40 h-40 border  border-red-600 shadow-2xl bg-white overflow-hidden">
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
                      <FaUser className="w-16 h-16"/>
                    )}
                    <input
                      type="file"
                      name="profileImageUrl"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  {!image && 
                    <p className="text-black text-sm pt-2">By clicking on the image you can change your profile image...</p>
                    }
                    {image && 
                    
                    <button className="text-white px-3 py-1 mt-5 rounded-xl ms-9 bg-yellow-500"
                    onClick={() =>handleChangeProfileImage()}
                    >Save Image</button>
                    }
                </div>
                </div>
                </div>
              <hr className="mt-10" />
              <div className="py-10">
                <p className="text-black text-lg font-semibold">Address</p>
                <p className="text-black pt-3">To help us locate you and find workers in your area, your address is required.</p>
                {user?.address ? (
                  <div className="pt-16">
                    <p className="text-black font-semibold">Address You have added</p>
                    <div className="shadow-lg ps-10 hover:scale-105 duration-300 pt-10 hover:shadow-xl space-y-2">
                    <p className="text-black">{user?.address?.houseName}</p>
                    <p className="text-black">{user?.address?.street} ,<span> {user?.address?.city}</span></p>
                    <p className="text-black"> {user?.address?.state} - <span> {user?.address?.pinCode}</span></p>
                    <button
                      className="hover:rounded-3xl duration-300 text-yellow-500 px-5 py-3 rounded-xl mt-4"
                      onClick={()=>setEditAddressModalIsOpen(true)}
                      >
                       <span>  
                            <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 pe-2"
                      /></span> Edit
                    </button>
                      </div>
                  </div>
                ) : (
                  <button
                       onClick={() => setAddAdrressModalIsOpen(true)}
                    className="hover:rounded-3xl duration-300 text-yellow-500 px-5 py-3 rounded-xl mt-4"
                  >
                      <span>  
                            <FontAwesomeIcon
                        icon={faPlus}
                        className="text-yellow-500 pe-2"
                      /></span>
                    Add Address
                  </button>
                )}
              </div>
            </div>
          ) : (
           <LoginInfo/>
          )}
        </div>
          <ReactModal
        isOpen={addAdrressModalIsOpen}
        onRequestClose={() => setAddAdrressModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50 py-5"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Box className="bg-white rounded-lg p-11 w-1/2  shadow-lg ">
          <h2 className="text-xl text-center text-black font-semibold mb-4">
            Add address
          </h2>
          <form 
          onSubmit={handleAddAddressSubmit}
          >
            <div className="">
              <>
                <label className="text-black">HouseName</label>
                <input
                  type="text"
                  name="houseName"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder="Enter your House name"
                  onChange={handleInputChange}
                />
                 <label className="text-black">Street</label>
                <input
                  type="text"
                  name="street"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder="Enter your street"
                  onChange={handleInputChange}
                />
                 <label className="text-black">City</label>
                <input
                  type="text"
                  name="city"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder="Enter your city"
                  onChange={handleInputChange}
                />
                 <label className="text-black">State</label>
                <input
                  type="text"
                  name="state"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder="Enter your state"
                  onChange={handleInputChange}
                />
                 <label className="text-black">Pincode</label>
                <input
                  type="number"
                  name="pinCode"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder="Enter your city"
                  onChange={handleInputChange}
                />
              </>
                {addressError && (
                  <p className="text-red-600">{addressError}</p>
                )}
                
            <div className="flex justify-end gap-3 mt-4 space-x-2">
              <button
                className="text-black rounded-xl"
                onClick={() => setAddAdrressModalIsOpen(false)}
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
          <form 
          onSubmit={handleEditAddressSubmit}
          >
            <div className="">

            {user?.address && (
              <>
                <label className="text-black">HouseName</label>
                <input
                  type="text"
                  name="houseName"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.address.houseName }
                  onChange={handleInputChange}
                />
                 <label className="text-black">Street</label>
                <input
                  type="text"
                  name="street"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.address.street}
                  onChange={handleInputChange}
                />
                 <label className="text-black">City</label>
                <input
                  type="text"
                  name="city"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.address.city}
                  onChange={handleInputChange}
                />
                 <label className="text-black">State</label>
                <input
                  type="text"
                  name="state"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.address.state}
                  onChange={handleInputChange}
                />
                 <label className="text-black">Pincode</label>
                <input
                  type="number"
                  name="pinCode"
                  className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                  placeholder={user?.address.pinCode}
                  onChange={handleInputChange}
                />
              </>
            )}
                {addressError && (
                  <p className="text-red-600">{addressError}</p>
                )}
                
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

export default Profile;
