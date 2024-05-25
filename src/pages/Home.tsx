import { FaArrowRight } from "react-icons/fa";
import Banner from "../components/Banner";
import PopularServices from "../components/PopularServices";
import TestMonialList from "../components/TestMonialList";
import TopRatedWorkers from "../components/TopRatedWorkers";
import image from "../assets/file (1).png";
import client from "../assets/clinet1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClientRegister = () => {
    navigate("/user-register");
  };
  return (
    <>
      <Banner />
      <PopularServices />
      <TopRatedWorkers />
      <TestMonialList />
      <div className="flex gap-14 md:flex-row flex-col p-4  md:px-20 pt-20">
        <div className="bg-[rgb(235,235,235)] h-[290px]  rounded-xl hover:shadow-lg hover:scale-105 duration-300">
          <div className="flex">
            <div className="">
              <p className="text-black font-semibold text-xl md:text-3xl pt-6 md:pt-14 ps-10">
                Become a Client
              </p>
              <p className="text-black text-sm px-10 mt-4">
                Find reliable blue-collar workers for your home projects. Browse
                profiles and book skilled professionals hassle-free.
              </p>
              <div
                onClick={handleClientRegister}
                className="flex text-blue-600 font-semibold bg-white w-[150px] h-[50px] ms-14 mt-8"
              >
                <button className="ms-4">Register Now</button>
                <FaArrowRight className="mt-4 ms-2" />
              </div>
            </div>
            <img className="w-[350px] hidden md:block h-[260px] mt-[30px]" src={client} />
          </div>
        </div>
        <div className="bg-[rgb(115,170,215)] h-[290px]  rounded-xl hover:shadow-lg hover:scale-105 duration-300">
          <div className="flex">
            <div className="">
              <p className="text-black font-semibold text-xl md:text-3xl pt-4 ps-10 md:pt-14 md:ps-14">
                Become a Worker
              </p>
              <p className="text-black text-sm md:ps-14 px-10 mt-4">
                Ready to showcase your skills? Join us as a worker. Register now
                for new opportunities and steady income..
              </p>
              <div className="flex text-blue-600 font-semibold bg-white w-[150px] h-[50px] ms-14 mt-8">
                <button className="ms-4">Register Now</button>
                <FaArrowRight className="mt-4 ms-2" />
              </div>
            </div>
            <img className="md:w-[320px] hidden md:block md:h-[200px] mt-[90px]" src={image} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
