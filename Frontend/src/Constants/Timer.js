import React from "react";
import { useTimer } from "react-timer-hook";

export const MyTimer = ({ expiryTimestamp, submitHandle }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => submitHandle(),
  });

  return (
    <div style={{ fontSize: "15px" }}>
      Time Left: <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>
      :<span>{seconds}</span>
    </div>
  );
};
