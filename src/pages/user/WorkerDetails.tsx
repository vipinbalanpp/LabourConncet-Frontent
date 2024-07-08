import { FaMobileAlt, FaStar } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Work from "../../components/worker/Work";
import Testimonial from "../../components/public/Testimonial";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IWorkerDetailsForStore } from "../../interfaces/worker";
import AvailabilityCalender from "../../components/worker/AvailabilityCalender";
import toast from "react-hot-toast";
import { IAddress } from "../../interfaces/user";
import instance from "../../config/axiozConfig";

const WorkerDetails = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const workers = useSelector((state: RootState) => state.admin.workers);
  const user = useSelector((state:RootState) => state.user.user)
  const [worker, setWorker] = useState<IWorkerDetailsForStore | undefined>();
  const { email } = useParams();
  const [addressError, setAddressError] = useState<string | null>(null);
  const [workDescription, setWorkDescription] = useState<string | null>(null);
  const [workDescriptionError, setWorkDescriptionError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates,setBookedDates] = useState<Date[]>([])
  const [unavailableDates,setUnavailableDates] = useState<Date[]>([])
  const [addressFormData, setAddressFormData] = useState<IAddress | any>({
    houseName:  null,
    street: null,
    city:null,
    state: null,
    pincode: null,
  });
  useEffect(() => {
    const foundWorker = workers.find((worker) => worker.email === email);
    setWorker(foundWorker);
    const fetchAvailabilityDates = async () => {
      try {
        const response = await instance.get(
          `booking/api/v1/get-availability-dates?workerId=${user?.id}`
        );
        setBookedDates(
          response.data.bookedDates.map(
            (dateString: string) => new Date(dateString)
          )
        );
        if (response.data.unavailableDates) {
          setUnavailableDates(
            response.data.unavailableDates.map(
              (dateString: string) => new Date(dateString)
            )
          );
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching availability dates:", error);
      }
    };
     fetchAvailabilityDates();
  }, [email, workers]);

  const handleBookingButtonClicked = () =>{
    if(!user) {
      toast.error("Please login to continue")
      return
    }
    setModalIsOpen(true)
  }
  const handleUseUserAddress = () => {
    if (user?.address) {
      setAddressFormData({
        houseName: user.address.houseName ?? '',
        street: user.address.street ?? '',
        city: user.address.city ?? '',
        state: user.address.state ?? '',
        pincode: user.address.pincode ?? '',
      });
    }
  };
  
  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if(name === 'workDescription'){
        if(value.length < 3 || value.length > 500){
          setWorkDescriptionError("Enter a valid desciption of work")
          return
          }else{
          setWorkDescription(value);
          setWorkDescriptionError(null)
          return
        }
    }
    if (name === 'pincode') {
      if (!/^\d{6}$/.test(value)) {
        setAddressError('Pincode must be 6 digits.');
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
    }
      const formData = {
        workAddress: addressFormData,
        workDescription: workDescription,
        bookingDate: new Date().toISOString().slice(0, 10),
        workDate: selectedDate?.toISOString().slice(0, 10),
        status: 'pending',
        workerId: worker?.id,
        userId: user?.id
      };
  
      console.log(formData); 
  
      instance
        .post("/booking/api/v1", formData)
        .then((result) => {
          toast.success(result.data);
          setModalIsOpen(false)
        })
        .catch((error) => {
          console.error("Error while posting booking:", error);
          toast.error("Failed to create booking");
        });
  };
  

 
  return (
    <>
   
      <Navbar />
      <p className=" text-2xl  ms-96 mt-10">Personal Info</p>
      <div className="flex gap-32  px-36 py-10">
        <div className="w-1/4">
          <div className="flex gap-4">
            <div className="w-20 h-20 overflow-hidden rounded-full border border-gray-200">
              <img
                src={worker?.profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-black font-semibold">{worker?.fullName}</p>
              <p>{worker?.service.serviceName}</p>
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
          <p className="text-black ms-5">{worker?.email}</p>
          <p className="flex gap-2 mt-5 items-center">
            <FaMobileAlt />
            Phone
          </p>
          <p className="text-black ms-5">{worker?.mobileNumber}</p>
          <p className="mt-5">Address</p>
          <p className="text-black ms-5">
            {worker?.address.houseName},{worker?.address.street},
            {worker?.address.city}
            <br />
            {worker?.address.state} -{worker?.address.pincode}
          </p>
          <div className="flex gap-10">
            <button className="h-[40px]  bg-blue-500 w-32 rounded-xl border mt-5  ms-2  text-white hover:rounded-3xl duration-300">
              Message
            </button>
            <button
              className="h-[40px]  bg-yellow-500 w-32 rounded-xl border mt-5  ms-2  text-white hover:rounded-3xl duration-300"
              onClick={ handleBookingButtonClicked}
            >
              Book
            </button>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <p className="mt-5">Full Name</p>
          <p className="text-black">{worker?.fullName}</p>
          <p>Gender</p>
          <p className="text-black">{worker?.gender}</p>
 
          <p>About</p>
          <p className="text-black">{worker?.about}</p>
          <p>Experience In years</p>
          <p className="text-black">{worker?.experience} years</p>
          <p>Service Charge per hour</p>
          <p className="text-black">₹{worker?.serviceCharge} per hour</p>
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
        <div className="bg-white rounded-lg p-14  shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Request for service
          </h2>

          <p className="text-black">Choose date</p>
          <div className="flex gap-10">
            <div className="flex justify-center mt-1">
              <AvailabilityCalender bookedDates={bookedDates}
               startDate={selectedDate} 
               setStartDate={setSelectedDate}  />
            </div>
            <div className="">
              <div className="flex"></div>
              <p className="text-center mt-14 text-black font-semibold">
                Add address of the location
              </p>
              <div className="flex gap-20">
                <div>
                  <label>Housename</label>
                  <input
                    type="text"
                    name="houseName"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={!addressFormData.houseName ? "Enter your house name" : addressFormData.houseName}  
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label>Street</label>
                  <input
                    type="text"
                    name="street"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={!addressFormData.street ? "Enter your street" : addressFormData.street}
                    onChange={handleAddressInputChange}
                  />
                </div>
                <button type="button" className="ml-2 px-4 py-2 text-black"
                onClick={handleUseUserAddress}
                >
                  Use My Address
                </button>
              </div>
              <div className="flex gap-10">
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={!addressFormData.city ? "Enter your city" : addressFormData.city} 
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={!addressFormData.state ? "Enter your state" : addressFormData.state}  
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label>Pincode</label>
                  <input
                    type="number"
                    name="pincode"
                    className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
                    placeholder={!addressFormData.pincode ? "Enter your pincode" : addressFormData.pincode}   
                    onChange={handleAddressInputChange}
                    />
                    {addressError && <p className="text-sm text-red-500">{addressError}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <label>Description of the work</label>
            <textarea
             name="workDescription"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder="Enter the description"
              onChange={handleAddressInputChange}
              rows={4}
            />
            {workDescriptionError &&  <p className="text-sm text-red-500">{workDescriptionError}</p>
 }
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={handleBooking}>
              Confirm
            </Button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default WorkerDetails;
