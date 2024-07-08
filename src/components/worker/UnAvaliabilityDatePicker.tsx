import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import instance from "../../config/axiozConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UnAvailabilityDatePicker = () => {
  const [unavailable, setUnavailable] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showAllBookedDates, setShowAllBookedDates] = useState(false);
  const [showAllUnavailableDates, setShowAllUnavailableDates] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);

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
    setUnavailable([date, ...unavailable]);
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
    return "";
  };

  const handleClick = () => {
    const response = instance.put(
      `booking/api/v1/set-availability-dates?workerId=${user?.id}`,
      unavailable
    );
    response.then((result) => {
      console.log(result);
      setBookedDates(
        result.data.bookedDates.map(
          (dateString: string) => new Date(dateString)
        )
      );
      if (result.data.unavailableDates) {
        setUnavailable(
          result.data.unavailableDates.map(
            (dateString: string) => new Date(dateString)
          )
        );
      }
    });
  };

  return (
    <>
      <p className="text-black  mb-4 text-sm">
        By selecting the dates from the calendar, you can easily mark the dates
        that you will be unavailable. The selected dates will be highlighted in
        red. After choosing all your unavailable dates, click the "Save" button
        to confirm your selections. You can update these dates at any time by
        revisiting the calendar. If you have any issues, contact our support
        team through the help section.
      </p>
      <div className="flex md:flex-row mt-10  justify-between">
        <div className=" md:w-auto">
          <div className="">
            <DatePicker
              selected={null}
              onChange={(date: Date) => handleDateChange(date)}
              inline
              dayClassName={getDayClassName}
              filterDate={filterBookedDates}
              minDate={new Date()}
            />

            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <p className="text-sm text-gray-700">Unavailable-Dates</p>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-700">Booked-Dates</p>
            </div>
          </div>
        </div>
        <div className=" shadow-xl border-gray-300 w-[400px] h-[400px] p-6 rounded-lg bg-white ">
          <p className="font-bold text-center pb-5">Mark as Unavailable</p>
          <div className="flex gap-2">
           <div className="flex flex-col">
           <label  className="text-black" htmlFor="from">From</label>
            <input
            id="from"
              type="date"
              className="border bg-white border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
           </div>
           <div className="flex flex-col">
           <label className="text-black" htmlFor="to">To</label>
            <input
            id="to"
              type="date"
              className="border bg-white border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
           </div>
          </div>
          <p className="font-bold mt-10">Select All</p>
          <div className="flex flex-wrap text-sm gap-3 mt-5">
          <div  className="flex items-center mb-2">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Sun</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Mon</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Tue</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Wed</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Thu</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Fri</label>
        </div>
        <div  className="flex items-center mb-1">
          <input
            type="checkbox"
           
          />
          <label className="text-gray-700">Sat</label>
        </div>
          </div>
         <div className="flex justify-center mt-10">
         <button
          className="px-4 me-10 py-2 bg-yellow-400 w-44 h-10 text-white font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-300"
          onClick={handleClick}
        >
          Save Selected
        </button>
         </div>
        </div>

        <div className="border shadow-xl border-1 w-[400px] h-[400px] me-5">
          <p>dslkfj</p>
        </div>
      </div>

      <div className="flex justify-between gap-44 pt-10">
        <button
          className="px-4 me-10 py-2 bg-yellow-400 w-44 h-10 text-white font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-300"
          onClick={handleClick}
        >
          Save Selected
        </button>
      </div>
    </>
  );
};

export default UnAvailabilityDatePicker;
