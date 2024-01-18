import React, { useEffect, useState } from "react";

const Timer = ({ time, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const timer = setTimeout(onTimeout, time);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress id="question-time" max={time} value={remainingTime} />;
};

export default Timer;
