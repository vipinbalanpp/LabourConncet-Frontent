import { Field, ErrorMessage, useFormik, useField } from "formik";

type InputWithIconType = {
  title: string;
  name: string;
  icon: string;
  placeholder: string;
  type: string;
  onchange?:(value:string)=>void
  handleChange?: () => void
  setValue?: (value:any) => void
};

const InputWithIcon = ({ title, name, icon, placeholder, type,setValue,onchange,handleChange }: InputWithIconType) => {
  const [field, meta] = useField(name);
  return (
    <div className="mb-5">
      <p>
        <label className="text-black ps-5" >{title}</label>
      </p>
      <div className="flex items-center">
        <div>{icon}</div>
        <Field
          className="sign-up-input w-full bg-white text-black ps-2  border placeholder:text-sm   border-yellow-300 h-10"
          name={name}
          type={type}
          placeholder={placeholder}
          validate={ onchange}
          onChange ={(e: any) => {
            field.onChange(e)
            if(setValue)
            setValue(e.target.value)
            if (handleChange) handleChange();
          }}
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

export default InputWithIcon;
