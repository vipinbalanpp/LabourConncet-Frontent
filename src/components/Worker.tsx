import image from "../assets/user.png";
import service from "../assets/plumbing.jpg";
import { FaStar } from "react-icons/fa";

const Worker = () => {
  return (
    <>
      <div className=" w-[320px] h-[200px]  mt-10 border border-1 shadow-md duration-300 hover:scale-110 hover:shadow-4xl cursor-pointer">
        <div className="flex  ">
          <img className="w-14 m-5  h-14 rounded-full" src={image} />
          <div className="">
            <h2 className=" text-black  pt-5  font-semibold">
              Vipin Balan
            </h2>
            <p className=" text-[rgb(156,155,155)] mt-[-18px] text-sm pt-5  font-semibold">
              Plumber
            </p>
            <p className=" text-yellow-600 mt-[-18px] text-xs pt-5  font-semibold">View Profile</p>
          </div>
          <img className="w-14 h-14 ms-12 mt-5" src={service} />
        </div>
        <div className="flex justify-between ps-5 pt-10">
          <div>
          <p className="text-sm text-[rgb(120,119,119)]">Experience</p>
          <p className="text-black text-sm font-semibold">5 years</p>
          </div>
          <div>
          <p className="text-sm text-[rgb(120,119,119)] pe-5">Rating</p>
         <div className="flex mt-1">
         <FaStar className="text-yellow-500 text-xl"/>
         <p className="text-black text-sm font-semibold ms-1">4.5</p>
         </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Worker;
