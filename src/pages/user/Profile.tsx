import { useState } from "react";
import Footer from "../../components/public/Footer";
import UserSidebar from "../../components/user/UserSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import instance from "../../config/axiozConfig";

const Profile = () => {
  const [profileActive, setProfileActive] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
const addressDto  = {
    houseName:"ponnamparambath",
    street:"kakkattil",
    city:"calicut",
    state:"kerala",
    pincode:"673507"
} 
const createAddress = async()=>{
        const response = await instance.post('user/api/v1/add-address',addressDto)
        console.log(response);
        
}

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
  return (
    <>
      <div className="flex">
        <UserSidebar />
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
                <div className="pt-20">
                  <p className="text-black font-semibold text-lg">
                    Profile Information
                  </p>
                  <p className="pt-2 text-black">
                    This is profile information that you can update anytime.{" "}
                  </p>
                  <button
                      className=" hover:rounded-3xl duration-300 text-yellow-500 px-5 py-3 rounded-xl mt-4"
                    >
                        <span>  
                            <FontAwesomeIcon
                        icon={faEdit}
                        className="text-gray-500 pe-2"
                      /></span>
                      Edit Profile Details
                    </button>
                </div>
              <hr className="mt-10" />
              <div className="py-10">
                <p className="text-black text-lg font-semibold">Address</p>
                {user?.address ? (
                  <div>
                    <div className="flex gap-10">
                    <div className="mt-3">
                    <p className="text-black">HouseName</p>
                    <p >{user?.address?.houseName}</p>
                    <p className="text-black pt-5">City</p>
                    <p >{user?.address?.city}</p>
                    <p className="text-black pt-5">Pincode</p>
                    <p >{user?.address?.pincode}</p>
                    </div>
                    <div className="mt-3">
                    <p className="text-black">Street</p>
                    <p >{user?.address?.street}</p>
                    <p className="text-black pt-5">State</p>
                    <p >{user?.address?.state}</p>
                    </div>
                    </div>
                    <button
                      className="hover:rounded-3xl duration-300 text-yellow-500 px-5 py-3 rounded-xl mt-4"
                    >
                      Edit Address
                    </button>
                  </div>
                ) : (
                  <button
                       onClick={createAddress}
                    className="bg-yellow-500 hover:rounded-3xl duration-300 text-white px-5 py-3 rounded-xl mt-4"
                  >
                    Add Address
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="pt-20">
                <p className="text-black font-semibold text-lg">
                  Basic Information
                </p>
                <p className="pt-2 text-black">
                  This is login information that you can change anytime
                </p>
              </div>
              <div className="flex py-10 gap-32">
                <div>
                  <p className="text-black font-semibold">Email</p>
                  <p>Email address can't change at this time</p>
                </div>
                <div>
                  <p className="text-black">
                    jakegyll@gmail.com{" "}
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-green-500"
                      />
                    </span>
                  </p>
                  <p>Your email address is verified</p>
                </div>
              </div>
              <hr />
              <div className="flex pt-10 gap-20">
                <div>
                  <p className="text-black font-semibold">Change Password</p>
                  <p className="mt-2">
                    Manage your password to make sure it is safe
                  </p>
                </div>
                <div className="px-28">
                  <label className="text-black">Old Password</label>
                  <input
                    type="password"
                    className="bg-white w-full  border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                    placeholder="Enter the old password"
                  />
                  <label className="text-black">New Password</label>
                  <input
                    type="password"
                    className="bg-white w-full border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                    placeholder="Enter the description"
                  />
                  <label className="text-black">Confirm New Password</label>
                  <input
                    type="password"
                    className="bg-white w-full border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                    placeholder="Enter the description"
                  />
                  <div className="flex justify-center">
                    <button className="bg-yellow-500 hover:rounded-3xl duration-300 text-white px-5 py-3 rounded-xl">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
