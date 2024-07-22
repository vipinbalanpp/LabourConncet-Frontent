import { FaAddressBook, FaMobileAlt, FaStar } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Testimonial from "../../components/public/Testimonial";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Button } from "@mui/base";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IWorkerDetailsForStore } from "../../interfaces/worker";
import AvailabilityCalender from "../../components/worker/AvailabilityCalender";
import toast from "react-hot-toast";
import { IAddress } from "../../interfaces/user";
import instance from "../../config/axiozConfig";
import Work from "../../components/worker/Work";

const WorkerDetails = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useSelector((state:RootState) => state.user)
  const [worker, setWorker] = useState<IWorkerDetailsForStore | undefined>();
  const { email } = useParams();
  const [addressError, setAddressError] = useState<string | null>(null);
  const [workDescription, setWorkDescription] = useState<string | null>(null);
  const [dateSelectionError,setDateSelectionError] = useState<string | null>(null);
  const [workDescriptionError, setWorkDescriptionError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates,setBookedDates] = useState<Date[]>([])
  const navigate = useNavigate()
  const [unavailableDates,setUnavailableDates] = useState<Date[]>([])
  const [addressFormData, setAddressFormData] = useState<IAddress | any>({
    houseName:  null,
    street: null,
    city:null,
    state: null,
    pincode: null,
  });
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        if (email) {
          const workerResponse = await instance.get(`/user/api/v1/workerDetails?email=${email}`);
          const workerData = workerResponse.data;
          setWorker(workerData);
          if (workerData.id) {
            const response = await instance.get(
              `booking/api/v1/get-availability-dates?workerId=${workerData.id}`
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
          }
        }
      } catch (error) {
        console.error("Error fetching worker details or availability dates:", error);
      }
    };
    fetchWorkerDetails();
  }, [email]);
  

  const handleBookingButtonClicked = () =>{
    if(!user) {
        navigate('/login')
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
    console.log(selectedDate,'date of booking');
    
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
    }else if(selectedDate === null){
      setDateSelectionError("Please select booking date");
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
      console.log(formData.bookingDate,'-------------->',formData.workDate);
      instance
        .post("/booking/api/v1", formData)
        .then((result) => {
          toast.success(result.data);
          setModalIsOpen(false)
          navigate('/user/bookings')
        })
        .catch((error) => {
          console.error("Error while posting booking:", error);
          toast.error("Failed to create booking");
        });
  };
  

 
  return (
    <div className="bg-white">
      <p className=" text-2xl  ms-56 font-bold mt-10">Personal Info</p>
      <div className="flex gap-32   px-36 mt-16">
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
          <p className="mt-2 flex items-center gap-2 font-semibold">
            <CiMail />
            Email
          </p>
          <p className="text-black ms-5">{worker?.email}</p>
          <p className="flex gap-2 mt-5 items-center font-semibold">
            <FaMobileAlt />
            Phone
          </p>
          <p className="text-black ms-5">{worker?.mobileNumber}</p>
          <p className="mt-2 flex items-center gap-2 font-semibold"><FaAddressBook/> Address</p>
          <p className="text-black ms-5">
            {worker?.address.houseName},{worker?.address.street},
            {worker?.address.city}
            <br />
            {worker?.address.state} -{worker?.address.pincode}
          </p>
          <div className="flex gap-10 mt-7">
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
        <div className="w-1/2 space-y-8">
          <div className="flex gap-20">
          <div>
          <p className="font-bold">Full Name</p>
          <p className="text-black">{worker?.fullName}</p>
          </div>
          <div>
          <p className="font-bold">Gender</p>
          <p className="text-black">{worker?.gender}</p>
          </div>
          </div>
 
          <div>
          <p className="mt-5 font-bold">About</p>
          <p className="text-black">{worker?.about}</p>
          </div>
          <div>
          <p className="font-bold">Experience In years</p>
          <p className="text-black">{worker?.experience} years</p>
          </div>
          <div>
          <p className="font-bold">Service Charge per hour</p>
          <p className="text-black">₹{worker?.serviceCharge} per hour</p>
          </div>
        </div>
      </div>
      <p className=" text-2xl text-center font-bold mt-8">Client Reviews</p>
      <div className="flex px-20 justify-between mb-5">
          <Testimonial />
          <Testimonial />
          <Testimonial />
          {/* <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial /> */}
      </div>
        <p className=" text-2xl font-bold text-center mt-10">Works</p>
      <div className="flex  justify-between px-32 py-10">
        <Work />
        <Work />
        <Work />
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-14  shadow-lg">
          <h2 className="text-2xl font-bold mb-10 text-center ">
            Request for service
          </h2>

          <p className="text-black ">Choose date</p>
          <div className="flex gap-10">
            <div>
            <div className="flex justify-center mt-1">
              <AvailabilityCalender  bookedDates={[...bookedDates,...unavailableDates]}
               selectedDate={selectedDate} 
               setSelectedDate={setSelectedDate} 
               setDateSelectionError={setDateSelectionError} />
            </div>
               {dateSelectionError && (
                <p className="text-sm text-red-500">{dateSelectionError}</p>
               )}
            </div>
            <div className="">
              <div className="flex"></div>
              <p className="text-center  text-lg  font-bold">
                Add address of the location
              </p>
              {!addressFormData.city && (
                <div className="flex justify-end">

               <button type="button" className="ml-2 px-4 py-2 rounded-xl text-white bg-yellow-500"
               onClick={handleUseUserAddress}
               >
                 Use My Address
               </button>
                </div>
            )}
              <div className="flex gap-20">
                <div>
                  <label className="text-black ps-3 text-sm">HouseName</label>
                  <input
                    type="text"
                    name="houseName"
                    className={`bg-white w-full border  ${addressFormData.houseName ? "placeholder:text-black":""} border-yellow-400 p-2 m-2`}
                    placeholder={!addressFormData.houseName ? "Enter your house name" : addressFormData.houseName}  
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label className="text-black ps-3 text-sm">Street</label>
                  <input
                    type="text"
                    name="street"
                    className={`bg-white w-full border  ${addressFormData.street ? "placeholder:text-black":""} border-yellow-400 p-2 m-2`}
                    placeholder={!addressFormData.street ? "Enter your street" : addressFormData.street}
                    onChange={handleAddressInputChange}
                  />
                </div>
             <div>
         
             </div>
              </div>
              <div className="flex gap-10">
                <div>
                  <label className="text-black ps-3 text-sm">City</label>
                  <input
                    type="text"
                    name="city"
                    className={`bg-white w-full border  ${addressFormData.city ? "placeholder:text-black":""} border-yellow-400 p-2 m-2`}
                    placeholder={!addressFormData.city ? "Enter your city" : addressFormData.city} 
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label className="text-black ps-3 text-sm">State</label>
                  <input
                    type="text"
                    name="state"
                    className={`bg-white w-full border  ${addressFormData.state ? "placeholder:text-black":""} border-yellow-400 p-2 m-2`}
                    placeholder={!addressFormData.state ? "Enter your state" : addressFormData.state}  
                    onChange={handleAddressInputChange}
                    />
                </div>
                <div>
                  <label className="text-black ps-3 text-sm">Pincode</label>
                  <input
                    type="number"
                    name="pincode"
                    className={`bg-white w-full border  ${addressFormData.pincode ? "placeholder:text-black":""} border-yellow-400 p-2 m-2`}
                    placeholder={!addressFormData.pincode ? "Enter your pincode" : addressFormData.pincode}   
                    onChange={handleAddressInputChange}
                    />
                    {addressError && <p className="text-sm text-red-500">{addressError}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <label className="text-black ps-3">Description of the work</label>
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
    </div>
  );
};

export default WorkerDetails;
