import { useEffect, useState } from "react";
import UserListTable from "../../components/admin/UserListTable";
import instance from "../../config/axiozConfig";
import Pagination from "../../components/public/Pagination";
import { IUserDetailsForStore } from "../../interfaces/user";
import toast from "react-hot-toast";

const UsersList = () => {
  const [users, setUsers] = useState<IUserDetailsForStore[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchTotalNumberOfPages();
  }, [ currentPage, isBlocked, searchInput]);

  const fetchTotalNumberOfPages = async () => {
    try {
      const params = {
        pageNumber: currentPage - 1,
        searchInput,
        isBlocked
      };
      
      const { data } = await instance.get("user/api/v1/getAllUsers", { params });
      setUsers(data.users);
      setTotalPages(data.totalNumberOfPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserBlocking = async (email: string) => {
    const response = await instance.put(
      `/user/api/v1/blockUser?email=${email}`
    );
    if (response) {
      if (response.data) {
        toast.success("User unblocked successfully");
      } else {
        toast.success("User Blocked successfully");
      }
     fetchTotalNumberOfPages()
    }
  };

  return (
    <div className="flex-grow p-1 mt-8">
      <div className="flex justify-between mt-3">
        <div></div>
        <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={() => setIsBlocked(null)}
            className={`px-3 py-1 rounded-[7px] text-sm border border-[rgb(31,41,55)] ${
              isBlocked === null
                ? "bg-[rgb(234,179,8)] text-white"
                : "bg-white text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() =>{
              setIsBlocked(false)
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded-[7px] text-sm border border-[rgb(31,41,55)] ${
              isBlocked === false
                ? "bg-[rgb(234,179,8)] text-white"
                : "bg-white text-black"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setIsBlocked(true)
              setCurrentPage(1)
            }}
            className={`px-3 py-1 rounded-[7px] text-sm border border-[rgb(31,41,55)] ${
              isBlocked === true
                ? "bg-[rgb(234,179,8)] text-white"
                : "bg-white text-black"
            }`}
          >
            Blocked
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <input
            onChange={(e) => setSearchInput(e.target.value.trim())}
            className="bg-white me-3 border-2 rounded-2xl text-black border-yellow-500 text-blackrounded-lg px-3 py-2 text-sm focus:outline-none  focus:ring-[rgb(31,41,55)] focus:border-[rgb(31,41,55)] transition"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>

      <UserListTable users={users} onBlockUser={handleUserBlocking} />
      {users.length === 0 && (
        <div
          className="bg-yellow-100 border mt-20 h-[100px] border-yellow-300 text-yellow-700 px-10 mx-10 py-3 rounded relative shadow-md flex items-center justify-between"
          role="alert"
        >
          <div>
            <strong className="font-bold">Notice: </strong>
            <span className="block sm:inline">No users available.</span>
          </div>
        </div>
      )}
      {users && users.length > 0 && (
        <div className="flex justify-center gap-10 mt-4">
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default UsersList;
