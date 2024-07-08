
import { Iservice } from "../../interfaces/admin";
interface propType {
  service:Iservice
}
const Service = ({service}:propType) => {
  return (
    <>
      <div className="md:w-[300px] w-[480px]  h-[200px] hover:scale-105 duration-300 hover:shadow-xl md:shadow-sm shadow-lg mt-3  cursor-pointer hover:rounded-md  ">
        <div className="flex items-center gap-2 mt-5 ms-5">
          <img className="w-24 h-24" src={service.logo} />
          <h2 className=" text-black font-semibold text-xl">{service.serviceName}</h2>
        </div>
          <p className="mt-[-22px]  text-center text-sm font-semibold">{service.workers && service.workers.length} {service.workers && service.workers.length === 1 ? (
            <span>worker</span>
          ):(
            <span>workers</span>
          )}</p>
      </div>
    </>
  );
};

export default Service;
