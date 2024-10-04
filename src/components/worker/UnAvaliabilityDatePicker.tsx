import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import instance from "../../config/axiozConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Modal from "react-modal";

const UnAvailabilityDatePicker = () => {
  const [unavailable, setUnavailable] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchAvailabilityDates();
  }, [user?.id]);

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
        setUnavailable(
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

  const handleDateChange = (date: Date) => {
    // Create a new date object that only includes the year, month, and day
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDates((prevSelectedDates) => {
      if (
        prevSelectedDates.some((d) => d.toDateString() === newDate.toDateString())
      ) {
        return prevSelectedDates.filter(
          (d) => d.toDateString() !== newDate.toDateString()
        );
      }
      return [newDate, ...prevSelectedDates];
    });
    console.log(selectedDates);
  };

  const isBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) =>
        new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  const isUnavailable = (date: Date) => {
    return unavailable.some(
      (unavailableDate) =>
        new Date(unavailableDate).toDateString() === date.toDateString()
    );
  };

  const isSelected = (date: Date) => {
    return selectedDates.some(
      (selectedDate) =>
        new Date(selectedDate).toDateString() === date.toDateString()
    );
  };

  const filterBookedDates = (date: Date): boolean => {
    return !isBooked(date);
  };

  const getDayClassName = (date: Date): string => {
    if (isBooked(date)) {
      return "text-white bg-blue-400 hover:bg-blue-400 font-bold";
    }
    if (isUnavailable(date)) {
      return "text-white bg-red-400 hover:bg-red-400 font-bold";
    }
    if (isSelected(date)) {
      return "text-white bg-yellow-400 hover:bg-yellow-400 font-bold";
    }
    return "";
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await instance.put(
        `booking/api/v1/set-availability-dates?workerId=${user?.id}`,
        selectedDates
      );
      console.log(response, "unavailability response");
      if (response.data.bookedDates) {
        setBookedDates(
          response.data.bookedDates.map(
            (dateString: string) => new Date(dateString)
          )
        );
      }
      if (response.data.unavailableDates) {
        setUnavailable(
          response.data.unavailableDates.map(
            (dateString: string) => new Date(dateString)
          )
        );
      }
      setSelectedDates([]);
      console.log(response);
    } catch (error) {
      console.error("Error setting availability dates:", error);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p className="text-black mb-4 px-3">
        By selecting the dates from the calendar, you can easily mark the dates
        that you will be unavailable. The selected dates will be highlighted in
        red. After choosing all your unavailable dates, click the "Save Selected" button
        to confirm your selections. You can update these dates at any time by
        revisiting the calendar. If you have any issues, contact our support
        team through the help section.
      </p>
      <div className="flex md:flex-row mt-10 me-32 justify-center">
        <div className="md:w-auto">
          <div className="larger-datepicker-container flex">
            <DatePicker
              selected={null}
              onChange={(date: Date) => handleDateChange(date)}
              inline
              dayClassName={getDayClassName}
              filterDate={filterBookedDates}
              minDate={new Date()}
            />

            <div className=" mt-4 ms-10 space-y-3">
              <div className="flex">
                <div className="w-3 h-3  bg-blue-400 rounded-full"></div>
                <p className="text-xs font-semibold text-black ml-2">Booked Dates</p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <p className="text-xs font-semibold text-black ml-2">Unavailable Dates</p>
              </div>
              <div className="flex">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <p className="text-xs font-semibold text-black ml-2">Selected Dates</p>
              </div>
              
              {selectedDates.length > 0 && (
                <div >
                 <button
  className="px-2 py-1 text-sm mt-32 font-semibold text-white bg-yellow-500 border border-yellow-500 rounded-xl shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
  onClick={handleSaveClick}
>
  Save Selected
</button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={handleCancel}
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
  <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl">
    <h2 className="text-xl text-center font-semibold mb-6 text-gray-800">
      Confirm Unavailability Dates
    </h2>
    <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
      <p className="text-lg font-semibold mb-4 text-gray-700">Selected Dates:</p>
      <ul className="mb-4 max-h-60 overflow-y-auto list-disc list-inside pl-5">
        {selectedDates.map((date, index) => (
          <li key={index} className="text-lg text-gray-700">
            {date.toDateString()}
          </li>
        ))}
      </ul>
    </div>
    <p className="text-lg text-gray-700 font-semibold mt-6">
      Are you sure you want to mark these dates as unavailable?
    </p>
    <div className="flex justify-end space-x-6 mt-8">
      <button
        onClick={handleCancel}
        className="px-10   font-semibold text-red-600 border border-red-600 rounded-xl hover:bg-red-50 transition duration-300"
      >
        No
      </button>
      <button
        onClick={handleConfirm}
         className="px-10 py-1  font-semibold text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition duration-300"
      >
        Yes
      </button>
    </div>
  </div>
</Modal>

    </>
  );
};

export default UnAvailabilityDatePicker;
