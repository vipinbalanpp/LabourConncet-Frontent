import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker__day--disabled {
    color: red;
    background-color: #f0e5e5;
  }
`;

interface WorkerAvailabilityCalendarProps {
  bookedDates: string[];
}

const AvailabilityCalender: React.FC<WorkerAvailabilityCalendarProps> = ({ bookedDates }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

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
      excludeDates={bookedDates.map((date) => new Date(date))}
    />
  );
};

export default AvailabilityCalender;