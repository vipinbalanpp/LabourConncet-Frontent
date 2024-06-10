import { FaSearch } from "react-icons/fa";
import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Service from "../../components/public/Service";

const ServiceListing = () => {
  return (
    <>
      <Navbar />
      <div className="px-44">
        <div className="flex justify-center w-full mt-10 p-5 hover:shadow-lg rounded-xl">
       <FaSearch  className="text-2xl mt-3 text-black"/>
          <input
            className="w-full  bg-white  border-b  pl-4  text-black"
            placeholder="Search by the service... "
          />
         <button className="h-[50px] bg-yellow-500 w-32 rounded-xl border  ms-2  text-white hover:rounded-3xl duration-300">
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap ps-28 mt-5 gap-14">
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
      </div>
      <Footer />
    </>
  );
};

export default ServiceListing;
