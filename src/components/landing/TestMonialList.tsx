import Testimonial from "../public/Testimonial";

const TestMonialList = () => {
  return (
    <div className="mt-10">
      <h1   className=" text-2xl font-semibold text-start ps-20 mt-10">What People Are Saying</h1>
      <div className="flex flex-wrap justify-between px-6 md:px-20">
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
      <div className="flex justify-end mt-1">
        <button className="flex pt-5 text-sm  text-yellow-500  bg-white  h-10 pe-14">
          View All
        </button>
      </div>
    </div>
  );
};

export default TestMonialList;
