import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker__day--disabled {
    color: red;
    background-color: #f542e9;
  }
`;

interface WorkerAvailabilityCalendarProps {
  bookedDates: Date[];
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

const AvailabilityCalendar: React.FC<WorkerAvailabilityCalendarProps> = ({ bookedDates, startDate, setStartDate }) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const isBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) => new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  return (
    <StyledDatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      inline
      dayClassName={(date: Date) => (isBooked(date) ? 'react-datepicker__day--disabled' : null)}
      excludeDates={bookedDates}
      minDate={tomorrow}
    />
  );
};

export default AvailabilityCalendar;
