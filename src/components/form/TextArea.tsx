import { Field, ErrorMessage } from 'formik';

type TextAreaProps = {
  title: string;
  name: string;
  placeholder: string;
};

const TextArea = ({ title, name, placeholder }: TextAreaProps) => {
  return (
    <div>
      <label className="block text-gray-700" >{title}</label>
      <Field
        name={name}
        placeholder={placeholder}
        className="mt-1 block border   border-yellow-300 w-[1400px] h-[200px]  bg-white  focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default TextArea;
