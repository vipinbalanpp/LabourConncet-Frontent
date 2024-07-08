import { useSelector } from "react-redux";
import Service from "../public/Service";
import { RootState } from "../../redux/store";

const PopularServices = () => {
  const services = useSelector((state:RootState) => state.admin.services)
  return (
    <div>
      <h1   className=" text-2xl font-semibold text-start ps-20 mt-10">Popular Services</h1>
      <div className="flex flex-wrap mt-5 justify-between px-10 md:px-20">
       {services.map((service) =>(
         <Service key={service.serviceName} service={service} />
       ))}
        {services.map((service) =>(
         <Service key={service.serviceName} service={service} />
       ))}
      </div>
      <div className="flex justify-end">
      <button className="flex mt-5 text-sm  text-yellow-500  bg-white  h-10 pe-14">
          View All
        </button>
      </div>
    </div>
  );
};

export default PopularServices;
