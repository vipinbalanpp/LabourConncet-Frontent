import { FaSearch } from "react-icons/fa";
import Service from "../../components/public/Service";
import { useEffect, useState } from "react";
import { Iservice } from "../../interfaces/admin";
import  instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";

const ServiceListing = () => {
  const[services,setServices] = useState<Iservice[] | null>(null);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [searchInput,setSearchInput] = useState('')
  useEffect(() => {
      const fetchData = async() => {
        try {
          const serviceResponse = await instance.get(`user/api/v1/get-all-services?pageNumber=${currentPage - 1}&pageSize=12&searchInput=${searchInput}`);
          console.log(serviceResponse, 'this is service response');
          setServices(serviceResponse.data.services);
          setTotalPages(serviceResponse.data.totalNumberOfPages+1);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };
    
      fetchData();
  },[searchInput])
  return (
    <>
      <div className="px-44">
        <div className="flex justify-center w-full mt-10 p-5 hover:shadow-lg rounded-xl">
       <FaSearch  className="text-2xl mt-3 text-black"/>
          <input
            className="w-full  bg-white  border-b  pl-4  text-black"
            placeholder="Search by the service... "
            onChange={(e) => setSearchInput(e.target.value.toLocaleLowerCase())}
          />
        
        </div>
      </div>
      <div className="flex flex-wrap ps-28 mt-5 bg-white gap-14">
        {services && services.map(service=>(
              <Service  key={service.serviceId} service={service}/>
        ))}
        {services?.length ===0 && (
          <div className="h-96 w-full flex items-center justify-center">
               <div className="bg-yellow-100 border  border-yellow-300 text-yellow-700 px-4 py-3 rounded relative shadow-md" role="alert">
             <strong className="font-bold">Notice: </strong>
             <span className="block sm:inline">No services available.</span>
            </div>
          </div>
        )}
      </div>
     {services?.length !== 0 &&(
<div className="pt-3 bg-white">
<Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages}/>

</div>
     )}
    </>
  );
};
 
export default ServiceListing;
