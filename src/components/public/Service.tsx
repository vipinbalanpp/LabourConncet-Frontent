import { useNavigate } from "react-router-dom";
import { Iservice } from "../../interfaces/admin";

interface propType {
  service: Iservice;
}

const Service = ({ service }: propType) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        data-aos="fade-up"
        onClick={() => navigate(`/workers-list/${service.serviceName}`)}
        className="max-w-sm mt-5 rounded-xl cursor-pointer bg-white  border border-yellow-300 overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        <div className="relative h-1/2">
          <img
            className="w-full h-full object-cover"
            src={service.image}
            alt={service.serviceName}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h3 className="text-white text-xl shadow-md bg-black bg-opacity-30 text-center font-bold tracking-wider uppercase">
              {service.serviceName}
            </h3>
          </div>
        </div>
        <div className="ps-5 pt-6">
          <p className="text-gray-700 font-semibold text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Service;
