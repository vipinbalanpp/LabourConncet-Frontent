import Service from "../public/Service";

const PopularServices = () => {
  return (
    <div>
      <h1 className="md:p-5 text-black  text-3xl font-semibold mt-10 md:mt-0 ps-24">Popular Services</h1>
      <div className="flex flex-wrap justify-between px-10 md:px-20">
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
        <Service />
      </div>
      <div className="flex justify-end">
      <button className="flex mt-5 text-sm  text-yellow-500  bg-white  h-10 pe-14">
          View All
        </button>
      </div>
    </div>
  );
};

export default PopularServices;
