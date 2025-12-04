import { CiMail } from "react-icons/ci";
import Testimonial from "../../components/public/Testimonial";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import {
  FaAddressBook,
  FaAward,
  FaDollarSign,
  FaMobileAlt,
  FaRupeeSign,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IWorkerDetailsForStore } from "../../interfaces/worker";
import toast from "react-hot-toast";
import { IAddress } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import AvailabilityCalendar from "../../components/worker/AvailabilityCalender";
ReactModal.setAppElement("#root");

const WorkerDetails = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [worker, setWorker] = useState<IWorkerDetailsForStore | undefined>();
  const { email } = useParams();
  const [addressError, setAddressError] = useState<string | null>(null);
  const [workDescription, setWorkDescription] = useState<string | null>(null);
  const [dateSelectionError, setDateSelectionError] = useState<string | null>(
    null
  );
  const [workDescriptionError, setWorkDescriptionError] = useState<
    string | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const navigate = useNavigate();
  const [addressFormData, setAddressFormData] = useState<IAddress | any>({
    houseName: null,
    street: null,
    city: null,
    state: null,
    pincode: null,
  });

  useEffect(() => {
    fetchWorkerDetails();
  }, [email]);

  const fetchWorkerDetails = async () => {
    try {
      if (email) {
        const workerResponse = await instance.get(
          `/user/api/v1/workerDetails?email=${email}`
        );
        const workerData = workerResponse.data;
        console.log(workerData, "this is worker details");

        setWorker(workerData);
        if (workerData.id) {
          const response = await instance.get(
            `booking/api/v1/get-availability-dates?workerId=${workerData.id}`
          );
          console.log(response, "this is availability response");

          const bookedDatesResponse = response.data.bookedDates
            ? response.data.bookedDates
            : [];
          const unavailableDatesResponse = response.data.unavailableDates
            ? response.data.unavailableDates
            : [];

          const combinedDates = [
            ...bookedDatesResponse.map(
              (dateString: string) => new Date(dateString)
            ),
            ...unavailableDatesResponse.map(
              (dateString: string) => new Date(dateString)
            ),
          ];
          setBookedDates(combinedDates);
        }
      }
    } catch (error) {
      console.error(
        "Error fetching worker details or availability dates:",
        error
      );
    }
  };

  const handleBookingButtonClicked = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setModalIsOpen(true);
  };

  const handleUseUserAddress = () => {
    if (user?.address) {
      setAddressFormData({
        houseName: user.address.houseName ?? "",
        street: user.address.street ?? "",
        city: user.address.city ?? "",
        state: user.address.state ?? "",
        pincode: user.address.pinCode ?? "",
      });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "workDescription") {
      if (value.length < 3 || value.length > 500) {
        setWorkDescription(value);
        setWorkDescriptionError("Enter a valid description of work");
      } else {
        setWorkDescription(value);
        setWorkDescriptionError(null);
      }
    } else if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        setAddressError("Pincode must be 6 digits.");
      } else {
        setAddressError(null);
      }
    } else if (name === "houseName") {
      if (value.trim() === "") {
        setAddressError("Housename or house number if required");
      } else {
        setAddressError(null);
      }
    } else if (name === "street") {
      if (value.length < 3 || value.length > 100) {
        setAddressError("Street is required");
      } else {
        setAddressError(null);
      }
    } else if (name === "city") {
      if (value.length < 2 || value.length > 50) {
        setAddressError("City is required.");
      } else {
        setAddressError(null);
      }
    } else if (name === "state") {
      if (value.length < 2 || value.length > 50) {
        setAddressError("State is required");
      } else {
        setAddressError(null);
      }
    }

    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleBooking = () => {
    if (!workDescription) {
      setWorkDescriptionError("Enter a valid description of work");
      return;
    } else if (
      !addressFormData.houseName ||
      !addressFormData.state ||
      !addressFormData.street ||
      !addressFormData.city ||
      !addressFormData.pincode
    ) {
      setAddressError("Complete the address fields");
      return;
    } else if (selectedDate === null) {
      setDateSelectionError("Please select booking date");
      return;
    }
    const formData = {
      workAddress: addressFormData,
      workDescription: workDescription,
      bookingDate: new Date().toISOString().slice(0, 10),
      workDate: selectedDate?.toISOString().slice(0, 10),
      workerId: worker?.id,
      userId: user?.id,
    };
    instance
      .post("/booking/api/v1", formData)
      .then((result) => {
        toast.success(result.data);
        setModalIsOpen(false);
        navigate("/user/bookings");
      })
      .catch((error) => {
        console.error("Error while posting booking:", error);
        toast.error(error.response.data);
        console.log(error);
      });
    console.log(formData);
  };
  const handleMessage = () => {
    const workerDetailsForChat = {
      id: worker?.id,
      name: worker?.username,
      profileImageUrl: worker?.profileImageUrl,
    };
    navigate("/user/messages", {
      state: {
        workerDetailsForChat,
      },
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <p className="text-3xl text-center font-bold mb-10">Worker Details</p>
      <div className="flex flex-col md:flex-row gap-16 px-32  ">
        <div className="w-full md:w-1/3 space-y-5 pt-10">
          <div className="flex gap-4">
            <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-200">
              <img
                src={worker?.profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-black font-semibold text-lg">
                {worker?.fullName}
              </p>
              <p className="text-gray-600">{worker?.service.serviceName}</p>
              <div className="flex items-center mt-1">
                <FaStar className="text-yellow-500 text-xl" />
                <p className="text-black text-sm font-semibold ms-1">4.5</p>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="mt-4">
            <p className="text-lg font-semibold">Contact</p>
            <p className="mt-2 flex items-center gap-2 font-semibold text-gray-700">
              <CiMail />
              Email
            </p>
            <p className="text-black ms-5">{worker?.email}</p>
            <p className="flex gap-2 mt-5 items-center font-semibold text-gray-700">
              <FaMobileAlt />
              Phone
            </p>
            <p className="text-black ms-5">{worker?.mobileNumber}</p>
            <p className="mt-2 flex items-center gap-2 font-semibold text-gray-700">
              <FaAddressBook /> Address
            </p>
            <p className="text-black ms-5">
              {worker?.address.houseName}, {worker?.address.street},
              {worker?.address.city}
              <br />
              {worker?.address.state} - {worker?.address.pinCode}
            </p>
          </div>
          <div className="flex gap-4 mt-7">
            <button
              onClick={handleMessage}
              className="h-10 bg-blue-500 w-32 rounded-xl border text-white hover:bg-blue-600"
            >
              Message
            </button>
            <button
              className="h-10 bg-yellow-500 w-32 rounded-xl border text-white hover:bg-yellow-600"
              onClick={handleBookingButtonClicked}
            >
              Book
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/3 space-y-8 mt-10">
          <div className="flex gap-20"></div>
          <div className="flex justify-between">
            <div>
              <p className="mt-2 flex items-center gap-2 font-semibold text-gray-700">
                <FaUser />
                Full Name
              </p>
              <p className="text-black ms-5">{worker?.fullName}</p>
            </div>
            <div>
              <p className="mt-2 flex items-center gap-2 font-semibold text-gray-700">
                <FaAward />
                Experience
              </p>
              <p className="text-black ms-5">{worker?.experience} years</p>
            </div>
            <div>
              <p className="mt-2 flex items-center gap-2 font-semibold text-gray-700">
                <FaRupeeSign />
                Service Charge
              </p>
              <p className="text-black ms-5">₹{worker?.serviceCharge}</p>
            </div>
          </div>
          <div>
            <p className="mt-5 font-bold text-gray-800">About</p>
            <p className="text-black">{worker?.about}</p>
          </div>
          <div>
            <p className="mt-5 font-bold text-gray-800">Skill Description</p>
            <p className="text-black">{worker?.service.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between px-20">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal p-10 rounded-xl bg-white  shadow-xl"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex  items-center justify-center"
      >
        <h2 className="text-2xl text-center font-bold mb-4">Book Worker</h2>
        <div className="flex justify-between gap-10">
          <div className="mt-4">
            <p className="text-black font-semibold">Select Date</p>
            <AvailabilityCalendar
              bookedDates={bookedDates}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setDateSelectionError={setDateSelectionError}
            />

            {dateSelectionError && (
              <p className="text-red-500 text-sm">{dateSelectionError}</p>
            )}
          </div>
          <div className="pt-16 font-semibold ">
            <div className="flex justify-between">
              <div></div>
              <p className="font-bold">Address of Work Location</p>
              <div>
                {user?.address && (
                  <button
                    onClick={handleUseUserAddress}
                    className="text-blue-500 hover:text-white duration-300 text-sm font-semibold py-2 px-4 rounded-[6px] shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Use My Address
                  </button>
                )}
                {/* <GoogleMapsLocationSelector onSelectLocation={handleLocationSelect} /> */}
              </div>
            </div>
            <div className="flex justify-between gap-10 pt-6">
              <div className="w-full">
                <p className="font-bold ">House Name</p>
                <input
                  type="text"
                  name="houseName"
                  value={addressFormData.houseName || ""}
                  placeholder="Enter housename"
                  onChange={handleInputChange}
                  className="border text-black placeholder:text-sm border-gray-300 p-2 bg-white rounded-md w-full"
                />
              </div>
              <div className="w-full">
                <p className="font-bold">Street</p>
                <input
                  type="text"
                  name="street"
                  placeholder="Enter street"
                  value={addressFormData.street || ""}
                  onChange={handleInputChange}
                  className="border text-black placeholder:text-sm border-gray-300 bg-white p-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="flex justify-between gap-10 mt-2">
              <div>
                <p className="font-bold">City</p>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter  city"
                  value={addressFormData.city || ""}
                  onChange={handleInputChange}
                  className="border text-black placeholder:text-sm border-gray-300 p-2 bg-white rounded-md w-full"
                />
              </div>
              <div>
                <p className="font-bold">State</p>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter  state"
                  value={addressFormData.state || ""}
                  onChange={handleInputChange}
                  className="border text-black placeholder:text-sm border-gray-300 bg-white p-2 rounded-md w-full"
                />
              </div>
              <div>
                <p className="font-bold">Pincode</p>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter  pincode"
                  value={addressFormData.pincode || ""}
                  onChange={handleInputChange}
                  className="border text-black placeholder:text-sm border-gray-300 p-2 bg-white rounded-md w-full"
                />
                {addressError && (
                  <p className="text-red-500 text-sm">{addressError}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-bold">Description of Work</p>
          <textarea
            name="workDescription"
            value={workDescription || ""}
            placeholder="Enter the description of the work"
            onChange={handleInputChange}
            className="border border-gray-300 p-2 bg-white rounded-md w-full h-24"
          />
          {workDescriptionError && (
            <p className="text-red-500 text-sm">{workDescriptionError}</p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={handleBooking}
          >
            Book
          </Button>
        </div>
      </ReactModal>
    </div>
  );
};

export default WorkerDetails;
