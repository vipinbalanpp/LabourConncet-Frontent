import Worker from "../public/Worker"
import { useEffect, useState } from "react"
import { IWorkerDetailsForStore } from "../../interfaces/worker"
import instance from "../../config/axiozConfig"


const TopRatedWorkers = () => {
  const [workers,setWorkers] = useState<IWorkerDetailsForStore[]>([])
  useEffect(() => {
    fetchWorkerData()
  },[])
  const fetchWorkerData = async () => {
    const workerResponse = await instance.get(`user/api/v1/getTopRatedWorkers`);
    if (workerResponse) {
      setWorkers(workerResponse.data);
    }
  };
  
    return (
        <div className="bg-gray-50">
            <h1  className=" text-2xl font-semibold text-center pt-10">Top Rated Workers</h1>
      <div className="flex space-y-5 mt-10 flex-wrap justify-between px-24">
        {workers && workers.map((worker) =>(
          <Worker key={worker.email}  worker={worker}/>
        ))}
      </div>
      
    </div>
    )
}
export default TopRatedWorkers