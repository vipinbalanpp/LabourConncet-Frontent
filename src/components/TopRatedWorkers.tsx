import { FaArrowRight } from "react-icons/fa"
import Worker from "./Worker"

const TopRatedWorkers = () => {
    return (
        <div>
        <div className="flex justify-between pe-10">
            <h1 className="p-5 text-black text-3xl">Top Rated Workers</h1>
            <button className="flex  border text-yellow-500 border-slate-300 bg-white p-2 h-10">View All <span className="ms-2 mt-1"><FaArrowRight /></span></button>
        </div>
      <div className="flex flex-wrap justify-between px-20">
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>
        <Worker/>

      </div>
    </div>
    )
}
export default TopRatedWorkers