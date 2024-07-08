import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import instance from "../../config/axiozConfig";

const LoginInfo = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user.user);
    const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(oldPassword === null || newPassword === null || confirmNewPassword === null){
          setPasswordError("Please fill all  fields")
          return;
        }
        if (!passwordError) {
          const response = instance.post('auth/api/v1/change-password', {
            oldPassword,
            newPassword
          });
          response.then((result) => {
            toast.success(result.data);
          }).catch(error=>{
          toast.error(error.response.data)
          })
        }
      }
      const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      };
      const handleNewPasswordChange = (password: string) => {
        setNewPassword(password);
        if (!validatePassword(password)) {
          setPasswordError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
        } else {
          setPasswordError(null);
        }
      };
      const handleConfirmPasswordChange = (password: string) => {
        setConfirmNewPassword(password)
        if(password !== newPassword){
          setPasswordError("Password mismatch")
        }else{
          setPasswordError(null)
          setConfirmNewPassword(password)
        }
      };
    return (
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
                  {user?.email}
                  <span>
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
              <form  
              onSubmit={handleChangePassword}
              >
              <div className="px-28">
                <label className="text-black">Old Password</label>
                <input
                  name="oldPassword"
                  type="password"
                  className="bg-white w-full  border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                  placeholder="Enter the old password"
                  onChange={(e) =>
                     setOldPassword(e.target.value)
                    }
                />
                <label className="text-black">New Password</label>
                <input
                name="newPassword"
                  type="password"
                  className="bg-white w-full border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                  placeholder="Enter the description"
                  onChange={(e) => handleNewPasswordChange(e.target.value)}
                />
                <label className="text-black">Confirm New Password</label>
                <input
                name="confirmPassword"
                  type="password"
                  className="bg-white w-full border text-black placeholder:text-sm border-yellow-400 p-2 mb-4"
                  placeholder="Enter the description"
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                <div className="flex justify-center">
                  <button type="submit" className="bg-yellow-500 hover:rounded-3xl duration-300 text-white px-5 py-3 rounded-xl">
                    Change Password
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
    )
}

export default LoginInfo
