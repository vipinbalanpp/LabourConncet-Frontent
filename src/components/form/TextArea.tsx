import { Field, ErrorMessage } from 'formik';

type TextAreaProps = {
  title: string;
  name: string;
  placeholder: string;
};

const TextArea = ({ title, name, placeholder }: TextAreaProps) => {
  return (
    <>
      <label className=" text-gray-700 font-semibold" >{title}</label>
      <Field
        name={name}
        placeholder={placeholder}
        className=" block border   border-yellow-300 w-full h-32 bg-white  focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </>
  );
};

export default TextArea;
