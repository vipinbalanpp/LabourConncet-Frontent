import React from "react";
import { PhoneCall, CheckCircle, UserPlus, Search } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Plumbers", icon: "🔧" },
  { name: "Electricians", icon: "💡" },
  { name: "Carpenters", icon: "🪚" },
  { name: "Painters", icon: "🎨" },
  { name: "AC Technicians", icon: "❄️" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Replace this URL if you want a different background image
const BACKGROUND_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/027/187/730/large_2x/portrait-of-happy-industrial-factory-retired-workers-professional-worker-in-a-helmet-labour-day-concept-ai-generative-photo.jpg";

const Banner: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url("${BACKGROUND_IMAGE}")`,
      }}
    >
      {/* dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/45 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-24 md:py-32 flex items-center justify-center min-h-screen">
        {/* centered content card */}
        <motion.div
          className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-10"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: main text & actions */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Trusted Pros
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12l4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-600">
                  Verified • Insured • Rated
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 leading-snug">
                Skilled professionals —{" "}
                <span className="text-yellow-600">on demand</span>
              </h1>
              <p className="text-gray-700 mt-3 md:mt-4 text-sm md:text-base">
                Book vetted plumbers, electricians, carpenters and more — same
                day bookings, secure payments, and verified reviews.
              </p>

              {/* search / booking */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 shadow-sm">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    aria-label="Search service or location"
                    className="bg-transparent outline-none px-3 text-sm md:text-base w-full"
                    placeholder="What do you need done? (e.g., plumber, AC repair, Bangalore)"
                  />
                </div>

                <button className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition">
                  Book Now
                </button>
              </div>

              {/* micro-features */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    <UserPlus className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Vetted Pros
                    </p>
                    <p className="text-xs text-gray-500">Background checks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      On-time
                    </p>
                    <p className="text-xs text-gray-500">Reliable scheduling</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    <PhoneCall className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Support
                    </p>
                    <p className="text-xs text-gray-500">24/7 help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: floating pro card & categories (compact) */}
            <div className="w-full md:w-72 flex flex-col items-center gap-4">
              <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 w-full">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=60"
                    alt="worker avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">Ravi K.</p>
                    <p className="text-xs text-gray-500">
                      Plumber • 4.8 ★ • 3k jobs
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition">
                    View
                  </button>
                  <button className="flex-1 bg-yellow-600 text-white text-sm px-3 py-2 rounded-md hover:bg-yellow-700 transition">
                    Book
                  </button>
                </div>
              </div>

              <div className="bg-white/90 rounded-xl p-3 shadow-sm border border-gray-100 w-full">
                <p className="text-xs text-gray-500 mb-2">Popular categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <span
                      key={c.name}
                      className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {c.icon} {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* small footer note inside card */}
          <div className="mt-6 text-xs text-gray-600 text-center w-full">
            Secure payments • Transparent pricing • Pay only after job completes
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
