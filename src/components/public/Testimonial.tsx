import React, { useState } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import user from "../../assets/user.png";

const Testimonial: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const quote =
    "Finding reliable workers for my home projects was always a hassle until I discovered this app. Now, I can easily browse profiles, read reviews, and book skilled professionals with confidence. Highly recommended!";

  return (
    <article
      data-aos="zoom-in"
      data-aos-duration="1000"
      className="w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      aria-label="Customer testimonial"
      role="region"
    >
      {/* Decorative header */}
      <div className="px-6 pt-6">
        <div className="inline-flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 p-2">
            <FaQuoteRight className="text-yellow-600 w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              {/* 5 stars */}
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500 w-4 h-4" />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Verified customer</p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="px-6 py-4">
        <p
          className={`text-gray-800 text-sm leading-relaxed transition-all ${
            expanded ? "max-h-full" : "max-h-[5.25rem] overflow-hidden"
          }`}
          aria-expanded={expanded}
        >
          {quote}
        </p>

        {/* read more/less */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((s) => !s);
          }}
          className="mt-3 text-xs text-yellow-600 font-semibold hover:underline"
          aria-label={
            expanded ? "Show less testimonial" : "Read full testimonial"
          }
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </div>

      {/* Footer with avatar and name */}
      <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-4 bg-gray-50">
        <img
          src={user}
          alt="Vipin Balan"
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border-2 border-yellow-100"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">Vipin Balan</p>
          <p className="text-xs text-gray-500">Homeowner • Bangalore</p>
        </div>
      </div>
    </article>
  );
};

export default Testimonial;
