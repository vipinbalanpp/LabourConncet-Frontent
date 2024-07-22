import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import instance from "../../config/axiozConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Modal from "react-modal";

// Set the app element for react-modal
Modal.setAppElement('#root'); // Assuming your root element has id 'root'

const UnAvailabilityDatePicker = () => {
  const [unavailable, setUnavailable] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
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

    fetchAvailabilityDates();
  }, [user?.id]);

  const handleDateChange = (date: Date) => {
    setSelectedDates((prevSelectedDates) => {
      if (
        prevSelectedDates.some((d) => d.toDateString() === date.toDateString())
      ) {
        return prevSelectedDates.filter(
          (d) => d.toDateString() !== date.toDateString()
        );
      }
      return [date, ...prevSelectedDates];
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

            <div className=" mt-4 ms-10 space-y-5">
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
                    className="text-sm px-3 py-2 bg-yellow-400   rounded-xl text-white font-semibold  hover:bg-yellow-500  duration-300"
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
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Confirm Unavailability Dates
          </h2>
          <div className="p-10">
            <p>Selected Dates:</p>
            <ul className="mb-4 max-h-60 overflow-y-auto">
              {selectedDates.map((date, index) => (
                <li key={index} className="text-lg text-gray-700">
                  {date.toDateString()}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-black font-semibold">
            Are you sure want to make these dates as unavailable dates ?
          </p>
          <div className="flex justify-end space-x-4 pt-10">
            <button
              onClick={handleCancel}
              className="px-4 py-2  text-red-500  font-semibold rounded-md  transition-colors duration-300"
            >
              No
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2  text-blue-500 font-semibold rounded-md  transition-colors duration-300"
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
