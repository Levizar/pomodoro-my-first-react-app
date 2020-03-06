import { useEffect, useRef } from "react";

export const formatTimeNum = num => {
  num < 10 ? (num = `0${num}`) : (num = `${num}`);
  return num;
};

export const timeModifier = (time, operator, timeModification) => {
  if (operator !== "+" && operator !== "-") throw Error;
  time = time.split(":");
  let [hour, min, sec] = time;
  time = 60 * 60 * +hour + 60 * +min + +sec;
  timeModification = timeModification.split(":");
  let [hourModification, minModification, secModification] = timeModification;
  timeModification =
    60 * 60 * +hourModification + 60 * +minModification + +secModification;

  operator === "+"
    ? (timeModification = +timeModification)
    : (timeModification = -timeModification);

  // total time in seconds
  let newTime = time + timeModification;
  if (newTime > 0) {
    // decomposition: seconds
    sec = newTime % 60;
    // rest in sec convert in min
    newTime = (newTime - sec) / 60;
    // decomposition in min
    min = newTime % 60;
    // rest in min convert in hour
    newTime = (newTime - min) / 60;
    hour = newTime % 60;
    newTime = [hour, min, sec].map(x => formatTimeNum(x));
    newTime = newTime.join(":");
  } else {
    newTime = "00:00:00";
  }
  return newTime;
};

// Thanks to Dan Abramov : https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// This function is a declarative implementation of setInterval
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
