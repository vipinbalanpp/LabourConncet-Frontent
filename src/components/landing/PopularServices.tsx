import Service from "../public/Service";
import { useEffect, useState } from "react";
import { Iservice } from "../../interfaces/admin";
import instance from "../../config/axiozConfig";

const PopularServices = () => {
  const[services,setServices] = useState<Iservice[] | null>(null)
  useEffect(() => {
    const fetchData = async() => {
      try {
        const serviceResponse = await instance.get(`user/api/v1/get-all-services?pageNumber=0&pageSize=8`);
        console.log(serviceResponse, 'this is service response from admin service list');
        setServices(serviceResponse.data.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  },[])
  return (
    <div className="mt-16">
      <h1   className=" text-2xl font-semibold text-center">Popular Services</h1>
      <div className="flex flex-wrap  justify-between px-10 md:px-20">
       {services && services.map((service) =>(
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
