import { useNavigate } from "react-router-dom";
import imageFile from "../../assets/Screenshot__161_-removebg-preview.png"

const Logo = ({color}:{color:string}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="flex cursor-pointer" onClick={handleClick}>
      <img className="h-[50px]" src={imageFile} alt="LabourConnect" />
      <h1 className="py-5 text-xl">
      <span className={`font-bold ${color ? `text-${color}` : "text-black"}`}>
Labour</span>
        <span className="font-bold text-yellow-500">Connect</span>
      </h1>
    </div>
  );
};

export default Logo;
