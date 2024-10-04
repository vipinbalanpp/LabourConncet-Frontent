const Banner = () => {
  return (
    <div>
      <div
        className="flex flex-col md:flex-row w-full py-10 bg-gray-100 md:pt-28 px-4 md:px-16 gap-10"
        data-aos="fade-right"
      >
        <div className="md:w-2/3 z-10 mt-10 md:mt-44 shadow-2xl rounded-2xl w-full md:py-32 px-4 md:px-10 text-center">
          <h1 className="text-center font-serif">
            <span className="md:text-2xl text-lg font-semibold text-yellow-600">
              <span className="text-black">
                Connecting You to Skilled Hands:
              </span>{" "}
              Find the Right
            </span>
          </h1>
          <h1 className="text-center font-serif">
            <span className="md:text-2xl text-xl font-semibold text-yellow-600">
              Worker for Every Job
            </span>
          </h1>
          <p className="text-black font-serif pt-10 text-base md:text-lg">
            Discover a seamless way to connect with skilled professionals for all
            your service needs. Whether you're tackling a home improvement
            project, need urgent repairs, or looking for regular maintenance, our
            platform brings you the best blue-collar workers—plumbers,
            electricians, carpenters, and more.
          </p>
        </div>
        <div className="hidden md:block md:w-2/3">
          <img
            className="rounded-xl shadow-2xl"
            src="https://static.vecteezy.com/system/resources/previews/027/187/730/large_2x/portrait-of-happy-industrial-factory-retired-workers-professional-worker-in-a-helmet-labour-day-concept-ai-generative-photo.jpg"
            alt=""
          />
        </div>
      </div>
      <div
        className="flex flex-col-reverse md:flex-row bg-gray-100 pb-10 md:pb-20 gap-10 md:gap-32 px-4 md:px-16"
        data-aos="fade-left"
      >
        <div className="w-full md:w-3/4 mt-10 md:mt-28">
          <img
            className="rounded-xl shadow-2xl h-auto md:h-[500px] w-full"
            src="https://img.freepik.com/free-photo/beautiful-woman-holding-cellphone-mobile-phone-okay-sign-recommending-application-shopping-app-standing-beige-background_1258-87209.jpg"
            alt=""
          />
        </div>
        <div className="w-full md:w-2/3 flex items-center justify-center text-center">
          <div className="shadow-2xl rounded-xl p-6 md:p-16 -mt-10 md:-mt-28">
            <p className="text-black text-base md:text-lg leading-relaxed font-serif">
              Whether you're tackling a home improvement project, need urgent
              repairs, or looking for regular maintenance, our platform brings
              you the best blue-collar workers—plumbers, electricians, carpenters,
              and more.
              <span className="text-secondary font-semibold text-lg md:text-xl block mt-4 mb-2">
                Why Choose Us?
              </span>
              With our{" "}
              <span className="text-highlight">user-friendly booking system</span>,
              <span className="text-highlight"> verified reviews</span>, and{" "}
              <span className="text-highlight">dedicated customer support</span>,
              you can find the perfect match for every job. Experience{" "}
              <span className="text-highlight">convenience</span>,{" "}
              <span className="text-highlight">reliability</span>, and{" "}
              <span className="text-highlight">top-notch service</span> like never
              before. Your trusted partner in getting things done, effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
