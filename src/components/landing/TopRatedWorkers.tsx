import Worker from "../public/Worker";
import { useEffect, useState } from "react";
import { IWorkerDetailsForStore } from "../../interfaces/worker";
import instance from "../../config/axiozConfig";

const TopRatedWorkers = () => {
  const [workers, setWorkers] = useState<IWorkerDetailsForStore[]>([]);

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    try {
      const workerResponse = await instance.get(`user/api/v1/getTopRatedWorkers`);
      if (workerResponse) {
        setWorkers(workerResponse.data);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4 md:px-20">
      <h1 className="text-2xl font-semibold text-center">Top Rated Workers</h1>
      <div className="flex flex-wrap justify-center md:justify-between gap-6 mt-10">
        {workers && workers.map((worker) => (
          <Worker key={worker.email} worker={worker} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedWorkers;
