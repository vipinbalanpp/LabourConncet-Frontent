import { useSelector } from "react-redux"
import Worker from "../public/Worker"
import { RootState } from "../../redux/store"


const TopRatedWorkers = () => {
  const workers = useSelector((state:RootState) => state.admin.workers)
  console.log(workers,'from top rated workers');
  
    return (
        <div className="">
            <h1  className=" text-2xl font-semibold text-start ps-20 mt-10">Top Rated Workers</h1>
      <div className="flex mt-10 flex-wrap justify-between px-20">
        {workers.map((worker) =>(
          <Worker key={worker.email}  worker={worker}/>
        ))}
      </div>
      <div className="flex justify-end mt-2">
      <button className="flex pt-5 text-sm  text-yellow-500  bg-white  h-10 pe-14">
          View All
        </button>
      </div>
    </div>
    )
}
export default TopRatedWorkers