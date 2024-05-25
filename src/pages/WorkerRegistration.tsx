import InputWithIcon from "../components/InputWithIcon";
import PasswordInputWithIcon from "../components/PasswordInput";

const WorkerRegistration = () => {
  return (
    <div>
      <p>Worker Registration</p>
      <div className="flex gap-5">
        <div>
          <InputWithIcon
            name="firstName"
            title="First Name"
            icon="👤"
            placeholder="Enter your first name"
            type="text"
          />
          <InputWithIcon
            name="mobile"
            title="Mobile Number"
            icon="👤"
            placeholder="Enter your mobile number"
            type="text"
          />
          <PasswordInputWithIcon
            name="password"
            title="Password"
            icon="🔒"
            placeholder="Enter your password"
            canEdit
          />
        </div>
        <div>
        <InputWithIcon
            name="lastName"
            title="Last Name"
            icon="👤"
            placeholder="Enter your last name"
            type="text"
          />
          <InputWithIcon
            name="email"
            title="email"
            icon="👤"
            placeholder="Enter your email"
            type="text"
          />
          <PasswordInputWithIcon
            name="confirmPassword"
            title="Confirm Password"
            icon="🔒"
            placeholder="Confirm your password"
            canEdit
          />
        </div>
      </div>
    </div>
  );
};

export default WorkerRegistration;
