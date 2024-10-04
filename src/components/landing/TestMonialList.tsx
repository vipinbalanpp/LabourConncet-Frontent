import Testimonial from "../public/Testimonial";

const TestMonialList = () => {
  return (
    <div className="mt-20 bg-yellow-50 py-10 px-4 md:px-10">
      <h1 className="text-2xl font-semibold text-center mt-10">
        What People Are Saying about LabourConnect
      </h1>
      <div className="flex flex-wrap justify-center md:justify-between gap-6 mt-10">
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
      <div className="flex justify-center md:justify-end mt-5">
        <button className="pt-2 text-sm text-yellow-500 h-10">
          View All
        </button>
      </div>
    </div>
  );
};

export default TestMonialList;
