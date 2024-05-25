import image from "../assets/plumbing.jpg";
import user from "../assets/user.png";

const Service = () => {
  return (
    <>
      <div className=" md:w-[300px] w-[480px]  h-[200px] hover:scale-105 duration-300 hover:shadow-xl md:shadow-sm shadow-lg mt-3  cursor-pointer hover:rounded-md  ">
        <div className="flex items-center  gap-2 mt-5 ms-5">
          <img className="w-24 h-24" src={image} />
          <h2 className=" text-black font-semibold text-xl">Plumbing</h2>
        </div>
        <div className="avatar-group  -space-x-4 rtl:space-x-reverse  ms-32">
          <div className="avatar border border-black-300">
            <div className="w-6  shadow-lg">
              <img src={user} />
            </div>
          </div>
          <div className="avatar border border-black-300">
            <div className="w-6 shadow-lg">
              <img src={user} />
            </div>
          </div>
          <div className="avatar  border border-black-300">
            <div className="w-6 shadow-lg">
              <img src={user} />
            </div>
          </div>
        </div>
          <p className="mt-[-22px]  ms-44 text-yellow-500 text-xs">+967 Workers</p>
      </div>
    </>
  );
};

export default Service;
