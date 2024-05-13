import image from "../assets/plumbing.jpg";
import user from "../assets/user.png"


const Service = () => {
  return (
    <><div className=" w-[300px] h-[150px] hover:scale-105 duration-300 hover:shadow-xl mt-14 cursor-pointer hover:rounded-md  shadow-sm">
      <div className="flex items-center  gap-2">

    <img className="w-16 h-16" src={image} />
    <h2 className=" text-black font-semibold">Plumbing</h2>
      </div>
 <div className="avatar-group  -space-x-4 rtl:space-x-reverse m-6">
      <div className="avatar border border-black">
        <div className="w-6  shadow-lg">
          <img src={user} />
        </div>
      </div>
      <div className="avatar border border-black">
        <div className="w-6 shadow-lg">
          <img src={user} />
        </div>
      </div>
      <div className="avatar  border border-black">
        <div className="w-6 shadow-lg">
          <img src={user} />
        </div>
      </div>
      <div className="avatar placeholder border border-black">
    <div className="w-6 bg-white text-black">
      <span className="text-sm font-semibold">+99</span>
    </div>
  </div>
    </div>
  </div>
 
  </>
  );
};

export default Service;
