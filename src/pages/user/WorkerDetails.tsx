import { FaMobileAlt, FaStar } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import image from "../../assets/user.png";
import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Work from "../../components/worker/Work";
import Testimonial from "../../components/public/Testimonial";
import ReactModal from "react-modal";
import { useState } from "react";
import { Button } from "@mui/base";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";

const WorkerDetails = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const bookedDates = ["2024-06-10", "2024-06-15", "2024-06-20"];

  const reverseGeocode = async (lat, lon) => {
    const apiKey = "YOUR_API_KEY";
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
      );
      const address = response.data.results[0].formatted;
      return address;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Unable to retrieve address";
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await reverseGeocode(latitude, longitude);
          setAddress(response);
        },
        (error) => {
          console.error(error);
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };
  return (
    <>
      <Navbar />
      <p className=" text-3xl  ms-56 mt-10">Personal Info</p>
      <div className="flex justify-between  px-40 py-10">
        <div className="w-1/4">
          <div className="flex gap-4">
            <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-200">
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-black font-semibold">Jake gyll</p>
              <p>Plumber</p>
              <div className="flex mt-1">
                <FaStar className="text-yellow-500 text-xl" />
                <p className="text-black text-sm font-semibold ms-1">4.5</p>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <p className="text-black font-semibold text-lg">Contact</p>
          <p className="mt-2 flex items-center gap-2">
            <CiMail />
            Email
          </p>
          <p className="text-black ms-5">vipinbalanpp@gmail.com</p>
          <p className="flex gap-2 mt-5 items-center">
            <FaMobileAlt />
            Phone
          </p>
          <p className="text-black ms-5">9061338505</p>
          <p className="mt-5">Address</p>
          <p className="text-black ms-5">
            4517 Washington Ave. Manchester, Kentucky 39495
          </p>
          <div className="flex gap-10">
            <button className="h-[40px]  bg-blue-500 w-32 rounded-xl border mt-5  ms-2  text-white hover:rounded-3xl duration-300">
              Message
            </button>
            <button
              className="h-[40px]  bg-yellow-500 w-32 rounded-xl border mt-5  ms-2  text-white hover:rounded-3xl duration-300"
              onClick={() => setModalIsOpen(true)}
            >
              Book
            </button>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <p className="mt-5">Full Name</p>
          <p className="text-black">Jerome Bell</p>
          <p>Gender</p>
          <p className="text-black">Male</p>
          <p>Date of Birth</p>
          <p className="text-black">18/02/2000</p>
          <p>About</p>
          <p className="text-black">
            Hello! I'm Jerome Bell, a passionate and dedicated plumber with a
            mission to provide exceptional service and exceed your expectations.
            With 10 years of experience in the field, I bring expertise,
            reliability, and a friendly demeanor to every project I undertake.
          </p>
          <p>Experience In years</p>
          <p className="text-black">6</p>
          <p>Service Charge per hour</p>
          <p className="text-black">₹200</p>
        </div>
      </div>
      <p className=" text-3xl text-center mt-10">Works</p>
      <div className="flex  justify-between px-32">
        <Work />
        <Work />
        <Work />
      </div>
      <p className=" text-3xl text-center mt-10">Client Reviews</p>
      <div className="flex px-20 justify-between">
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
      <Footer />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6  shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Request for service</h2>
          <p className="mb-4">
            Please fill in the details below to book the service.
          </p>
          <div>
            <p>Add address of the location</p>
            <div className="flex">
              <input
                type="text"
                className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                placeholder="Enter the description"
              />
              <input
                type="text"
                className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                placeholder="Enter the description"
              />
              <input
                type="text"
                className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                placeholder="Enter the description"
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 text-black"
                onClick={handleGetCurrentLocation}
              >
                <FaLocationCrosshairs />
              </button>
            </div>
            <label>Enter the description of the work</label>
            <input
              type="text"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder="Enter the description"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-blue-500 text-white rounded px-4 py-2">
              Confirm
            </Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default WorkerDetails;
