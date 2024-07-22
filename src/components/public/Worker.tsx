import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IWorkerDetailsForStore } from "../../interfaces/worker";

type workerType = {
  worker: IWorkerDetailsForStore
}

const Worker = ({ worker }: workerType) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="w-[320px] h-[220px] rounded-xl mt-5 shadow-md duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-white"
      onClick={() => navigate(`/worker-details/${worker.email}`)}
    >
      <div className="flex p-4">
        <img 
          className="w-24 h-24 rounded-xl object-cover border-2 border-gray-300" 
          src={worker?.profileImageUrl} 
          alt={`${worker?.fullName} profile`}
        />
        <div className="ml-10 pt-5 flex-1">
          <h2 className="text-black  text-lg">
            {worker?.fullName}
          </h2>
          <p className="text-gray-500  mt-1">
            {worker?.service?.serviceName}
          </p>
          {/* <p className="text-blue-500 text-xs mt-1 font-medium">
            View Profile
          </p> */}
        </div>
        {/* <img 
          className="w-16 h-16 object-cover" 
          src={worker?.service?.logo} 
          alt={`${worker?.service?.serviceName} logo`}
        /> */}
      </div>
      <div className="flex justify-between px-5 pb-4 mt-5">
        <div>
          <p className="text-sm text-gray-400">Experience</p>
          <p className="text-black font-semibold">{worker.experience} years</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Service charge</p>
          <p className="text-black font-semibold">₹ <span className="text-red-500">{worker.serviceCharge}</span>/hr</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Rating</p>
          <div className="flex items-center mt-1">
            <FaStar className="text-yellow-500 text-xl" />
            <p className="text-black font-semibold ml-1">4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worker;
