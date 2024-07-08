import { FaFilter, FaSearch, FaSort } from "react-icons/fa";
import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Worker from "../../components/public/Worker";
import { useEffect, useState } from "react";
import Loading from "../../components/public/Loading";
import instance from "../../config/axiozConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllWorkers } from "../../redux/actions/adminActions";
import Pagination from "../../components/public/Pagination";
import ReactModal from "react-modal";

const WorkerListing = () => {
  const workers = useSelector((state: RootState) => state.admin.workers);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [totalNumberOfPages,setTotalNumberOfPages] = useState(0)
  const[filterModalIsOpen,setFilterModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const { data } = await instance.get(
            `user/api/v1/getTotalPageNumbersOfWorkers?searchInput=${searchInput}&pageSize=12`
          );
          setTotalNumberOfPages(data);
          console.log(data,'pagenumber');
          dispatch(getAllWorkers({pageNumber:currentPage-1,pageSize:12,searchInput}))
        
      
      } catch (error) {
      }
    };
    fetchData();
  }, [searchInput, currentPage, dispatch]);

  return (
    <>
      <Navbar />
      <div className="px-44">
        <div className="flex justify-center w-full mt-10 p-5 hover:shadow-lg rounded-xl">
          <FaSearch className="text-2xl mt-3 text-black" />
          <input
          onChange={(e) => setSearchInput(e.target.value)}
            className="w-full  bg-white  border-b  pl-6  text-black"
            placeholder="Search for worker... "
          />
        
          <button className="hover:shadow-xl ms-10 hover:border-0 duration-300 border px-10 py-2 text-black font-semibold rounded-3xl flex items-center">
            <FaSort />
            Sort
          </button>
          <button
          onClick={() => setFilterModalIsOpen(true)}
           className="hover:shadow-xl ms-10 hover:border-0 duration-300 border px-10 py-2 text-black font-semibold rounded-3xl flex items-center">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>
      {workers && (
        <div className={`${workers.length !==0 ? "min-h-screen flex-wrap flex gap-10 ":"justify-center items-center pe-20 h-[400px]"} ps-20 pt-10 pb-20    bg-white`}>
          {workers.map((worker) => (
            <Worker worker={worker} />
          ))}
          {workers.length === 0 && (
       
         <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded relative shadow-md" role="alert">
        <strong className="font-bold">Notice: </strong>
        <span className="block sm:inline">No workers available.</span>
       </div>
      )}
        </div>
      )}
     {workers.length > 0 && (
       <Pagination currentPage={currentPage}onPageChange={setCurrentPage} totalPages={totalNumberOfPages}/>
     )}
      <Footer />
      {loading && <Loading />}
      {filterModalIsOpen && (
         <ReactModal
         isOpen={filterModalIsOpen}
         onRequestClose={()=>setFilterModalIsOpen(false)}
         contentLabel="Filter Modal"
         className="bg-white p-6 absolute left-1/4 top-1/3 rounded w-1/2 shadow-lg"
         overlayClassName="fixed inset-0 bg-black bg-opacity-50"
     >
         <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
         <form onSubmit={()=>{}} className="space-y-4">
             <div>
                 <label className="block text-sm font-medium text-gray-700">Category</label>
                 <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                     <option value="">Select category</option>
                     <option value="plumbing">Plumbing</option>
                     <option value="electrical">Electrical</option>
                     <option value="carpentry">Carpentry</option>
                 </select>
             </div>
             <div>
                 <label className="block text-sm font-medium text-gray-700">Availability</label>
                 <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
             </div>
             <div className="flex justify-end">
                 <button type="button" onClick={()=>setFilterModalIsOpen(false)} className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded">
                     Cancel
                 </button>
                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                     Apply Filters
                 </button>
             </div>
         </form>
     </ReactModal>
      )}
    </>
  );
};

export default WorkerListing;
