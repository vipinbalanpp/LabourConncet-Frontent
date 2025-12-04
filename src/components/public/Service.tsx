import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ArrowRight } from "lucide-react";
import { Iservice } from "../../interfaces/admin";

interface PropType {
  service: Iservice;
}

const Service: React.FC<PropType> = ({ service }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/workers-list/${encodeURIComponent(service.serviceName)}`);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleNavigate();
      }}
      onClick={handleNavigate}
      data-aos="fade-up"
      className="max-w-sm w-full mt-10 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-200"
      aria-label={`View ${service.serviceName} workers`}
    >
      {/* IMAGE */}
      <div className="relative h-52 md:h-44 lg:h-56">
        <img
          src={service.image}
          alt={service.serviceName}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top-left badge */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l4 4L19 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Popular
        </div>

        {/* Top-right small action (favorite) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: toggle favorite
          }}
          aria-label={`Save ${service.serviceName}`}
          className="absolute right-3 top-3 bg-white/90 p-2 rounded-full shadow-sm hover:scale-105 transition"
        >
          <Heart className="w-4 h-4 text-pink-500" />
        </button>

        {/* Title centered over the image */}
        <div className="absolute left-0 right-0 bottom-4 px-4">
          <h3 className="text-center text-white text-lg md:text-xl font-semibold drop-shadow-md tracking-wide">
            {service.serviceName}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-5">
        {/* rating / meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">4.8</span>
            </div>

            <div className="text-xs text-gray-500">• 3k jobs</div>
          </div>

          <div className="text-xs text-gray-500">Since 2019</div>
        </div>

        {/* description */}
        <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-3">
          {service.description ??
            "Experienced pros available for residential and commercial jobs. Reliable, vetted, and insured."}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition"
            aria-label={`See ${service.serviceName} workers`}
          >
            View Workers
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-sm text-gray-600">
            From <span className="font-semibold text-gray-800">₹ 299</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Service;
