import React from "react";
import { FaStar, FaHeart, FaRegHeart, FaCertificate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IWorkerDetailsForStore } from "../../interfaces/worker";

type WorkerType = {
  worker: IWorkerDetailsForStore;
};

const Worker: React.FC<WorkerType> = ({ worker }) => {
  const navigate = useNavigate();
  const rating = worker?.rating ?? 4.5;
  const jobsCount = worker?.jobsCompleted ?? 1200;
  const verified = !!worker?.isVerified;
  const image = worker?.profileImageUrl || "/placeholder-worker.png"; // replace placeholder path as needed

  const handleNavigate = () => {
    navigate(`/worker-details/${encodeURIComponent(worker.email)}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: toggle favourite action
    console.log("toggle favorite for", worker.email);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleNavigate();
      }}
      data-aos="zoom-in-up"
      data-aos-duration="800"
      className="w-full max-w-md bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 cursor-pointer overflow-hidden border border-gray-100"
      aria-label={`Open ${worker?.fullName} details`}
    >
      {/* Top row */}
      <div className="flex gap-4 p-4 items-start">
        <div className="relative flex-shrink-0">
          <img
            src={image}
            alt={`${worker?.fullName ?? "Worker"} profile`}
            loading="lazy"
            className="w-28 h-28 rounded-xl object-cover border border-gray-200"
          />

          {/* online / verified badge */}
          {verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
              <FaCertificate className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-gray-900 font-semibold text-lg leading-tight">
                {worker?.fullName ?? "Unknown"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {worker?.service?.serviceName ?? "Service"}
              </p>
            </div>

            <button
              onClick={handleFavorite}
              aria-label={`Save ${worker?.fullName}`}
              className="p-2 rounded-lg bg-white border border-gray-100 shadow-sm hover:bg-gray-50"
            >
              {/* Replace with filled heart if favorited */}
              <FaRegHeart className="w-4 h-4 text-pink-500" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {worker?.bio ??
              "Reliable professional with experience in residential and commercial jobs. Clean workmanship and punctual."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Bottom meta row */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
              <FaStar className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="text-xs text-gray-500">({jobsCount})</div>
          </div>

          <div className="text-sm">
            <p className="text-xs text-gray-400">Experience</p>
            <p className="font-semibold text-gray-800">
              {worker?.experience ?? 0} yrs
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-gray-400">Service charge</div>
          <div className="text-right">
            <span className="text-sm text-gray-600">₹</span>{" "}
            <span className="text-lg font-semibold text-red-600">
              {worker?.serviceCharge ?? "—"}
            </span>
            <span className="text-xs text-gray-500"> / hr</span>
          </div>

          <div className="mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate();
              }}
              className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm"
            >
              View
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Worker;
