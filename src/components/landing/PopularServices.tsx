import Service from "../public/Service";
import { useEffect, useState } from "react";
import { Iservice } from "../../interfaces/admin";
import instance from "../../config/axiozConfig";

const PopularServices = () => {
  const [services, setServices] = useState<Iservice[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await instance.get(
          `service/api/v1/get-all-services?pageNumber=0&pageSize=3`
        );
        console.log(serviceResponse, "SERVICE LIST IN HOME");
        setServices(serviceResponse.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-16 px-4 md:px-20">
      <h1 className="text-2xl font-semibold text-center">Popular Services</h1>
      <div className="flex flex-wrap justify-center md:justify-between gap-4 mt-8">
        {services &&
          services.map((service) => (
            <Service key={service.serviceName} service={service} />
          ))}
      </div>
      <div className="flex justify-center md:justify-end mt-8">
        <button className="text-sm text-yellow-500 bg-white border border-yellow-500 rounded-md px-4 py-2 hover:bg-yellow-500 hover:text-white transition duration-300">
          View All
        </button>
      </div>
    </div>
  );
};

export default PopularServices;
