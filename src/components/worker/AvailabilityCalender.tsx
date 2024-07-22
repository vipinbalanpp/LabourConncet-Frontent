import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker__day--disabled {
    color: red;
    background-color: #f542e9;
  }
  .react-datepicker__day--selected {
    background-color: blue !important;
    color: white !important;
  }
`;

interface WorkerAvailabilityCalendarProps {
  bookedDates: Date[];
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setDateSelectionError?: (error: string | null) => void;
}

const AvailabilityCalendar: React.FC<WorkerAvailabilityCalendarProps> = ({
  bookedDates,
  selectedDate,
  setSelectedDate,
  setDateSelectionError
}) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const isBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) => new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  const dayClassName = (date: Date) => {
    if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
      return 'react-datepicker__day--selected';
    }
    return isBooked(date) ? '' : 'font-bold';
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setSelectedDate(adjustedDate);
      if (setDateSelectionError) {
        setDateSelectionError(null);
      }
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <StyledDatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      inline
      dayClassName={dayClassName}
      excludeDates={bookedDates}
      minDate={tomorrow}
    />
  );
};

export default AvailabilityCalendar;
