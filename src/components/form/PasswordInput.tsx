import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type PasswordInputWithIconType = {
  title: string,
  name: string,
  icon: string,
  placeholder: string,
  canEdit: boolean,
}

const PasswordInputWithIcon = ({ title, name, icon, placeholder, canEdit }: PasswordInputWithIconType) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5">
      <p>
        <label className="text-black ps-5 font-semibold" >{title}</label>
      </p>
      <div className="relative flex items-center">
        <div className="sign-up-icon">{icon}</div>
        <Field
          className="sign-up-input text-black ps-2 w-full bg-white border placeholder:text-sm  border-yellow-300 h-10 pr-10" // Add padding-right to avoid text overlap with the icon
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          disabled={!canEdit}
        />
        <div className="absolute right-2 cursor-pointer  text-black" onClick={togglePassword}>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  );
};

export default PasswordInputWithIcon;
