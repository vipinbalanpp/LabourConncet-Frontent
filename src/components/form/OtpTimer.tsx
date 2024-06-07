// src/components/OtpTimer.js

import React, { useState, useEffect } from 'react';

const OtpTimer = ({ initialTime = 30, onTimerComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      if (onTimerComplete) {
        onTimerComplete();
      }
    }
  }, [timeLeft, onTimerComplete]);

  return (
    <>
      <p className='text-red-500 text-sm'>Time left: {timeLeft} seconds</p>
    </>
  );
};

export default OtpTimer;
