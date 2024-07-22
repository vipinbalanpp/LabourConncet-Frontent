import { useState } from 'react';
import {  ErrorMessage, useFormikContext } from 'formik';
type TextAreaProps = {
  title: string,
  name: string,
};

const FileInput = ({ title, name }: TextAreaProps) => {
  const [image, setImage] = useState<string | null>(null);
  const { setFieldValue } = useFormikContext();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
   

    if (file) {
      const reader = new FileReader();
      reader.onload =async (e) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
          setFieldValue(name, file);
     
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-semibold" >{title}</label>
      <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-gray-300 shadow-xl bg-white overflow-hidden mt-1">
        {image ? (
          <img src={image} alt="Uploaded" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 10a5 5 0 100-10 5 5 0 000 10zm0 1a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z" clipRule="evenodd" />
            </svg>
          </span>
        )}
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default FileInput;
