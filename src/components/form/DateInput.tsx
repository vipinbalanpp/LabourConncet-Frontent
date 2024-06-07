import { Field, ErrorMessage } from "formik";

type TextInputProps = {
  title: string;
  name: string;
  placeholder: string;
};

const DateInput = ({ title, name, placeholder }: TextInputProps) => {
  return (
    <div className="ps-5">
      <p>
        <label className="text-black " >{title}</label>
      </p>
      <div className="flex items-center">
        <Field
          className="sign-up-input  bg-white text-black ps-2 border placeholder:text-sm w-full    border-yellow-300 h-10"
          name={name}
          type='date'
          placeholder={placeholder}
        />
        
      </div>
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  );
};

export default DateInput;
