import { Field, ErrorMessage } from 'formik';

type RadioButtonProps = {
  title: string;
  name: string;
  options: { label: string, value: string }[];
};

const RadioButton = ({ title, name, options }: RadioButtonProps) => {
  return (
    <div>
      <label className="block text-gray-700">{title}</label>
      <div className="flex items-center space-x-4 mt-1">
        {options.map(option => (
          <label key={option.value} className="inline-flex items-center">
            <Field name={name} type="radio" value={option.value} className="bg-white" />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default RadioButton;
