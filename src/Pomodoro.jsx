import React, { useState, useEffect } from "react";
import { timeModifier, useInterval } from "./ressources";
import "./Pomodoro.scss";

const Pomodoro = () => {
  const [defaultTime, setDefaultTime] = useState("00:25:00");
  const [timer, setTimer] = useState(defaultTime);
  const [defaultBreakTime, setBreakDefaultTime] = useState("00:05:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isBreakTime, setBreakTime] = useState(false);

  const startStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  const reset = () => {
    setTimer(isBreakTime ? defaultBreakTime : defaultTime);
  };

  const next = () => {
    setBreakTime(!isBreakTime);
    // This can't be done here, it is done in the effect below because
    // isBreakTime isn't set when the condition is evaluated.
    // setTimer(isBreakTime ? defaultBreakTime : defaultTime);
  };
  // Next part of the next function
  useEffect(() => {
    setTimer(isBreakTime ? defaultBreakTime : defaultTime);
  }, [isBreakTime]); // We don't put defaultBreakTime and defaultTime there because we don't want the hook to fire everytime one of them change

  const minusPlus = (op, setterFunc, defaultTimeToChange) => {
    setterFunc(timeModifier(defaultTimeToChange, op, "00:01:00"));
  };

  useInterval(() => {
    if (isRunning && timer !== "00:00:00") {
      setTimer(timeModifier(timer, "-", "00:00:01"));
    } else if (isRunning) {
      // thus it is 00:00:00
      next();
    }
  }, 1000);

  // condition on the rended timer for further development
  return (
    <div className="pomodoro">
      <h1>Pomodoro</h1>
      <div className="flexRaw">
        <ActualSession
          session={isBreakTime ? "Break Time" : "Work session"}
          timer={timer}
          funcBt1={startStop}
          funcBt2={reset}
          funcBt3={next}
          isRunning={isRunning}
        />
        <div className="parameters">
          <SessionTimer
            compName={"Session timer"}
            timer={defaultTime}
            funcBt1={() => minusPlus("-", setDefaultTime, defaultTime)}
            funcBt2={() => minusPlus("+", setDefaultTime, defaultTime)}
          />
          <SessionTimer
            compName={"Break timer"}
            timer={defaultBreakTime}
            funcBt1={() =>
              minusPlus("-", setBreakDefaultTime, defaultBreakTime)
            }
            funcBt2={() =>
              minusPlus("+", setBreakDefaultTime, defaultBreakTime)
            }
          />
        </div>
      </div>
    </div>
  );
};

const ActualSession = props => {
  return (
    <div className="actualSession">
      <h2>{props.session}</h2>
      <h2>{props.timer}</h2>
      <div>
        <button onClick={props.funcBt1}>
          {props.isRunning ? "Stop" : "Start"}
        </button>
        {props.isRunning ? null : (
          <button onClick={props.funcBt2}>Reset</button>
        )}
      </div>
      <button onClick={props.funcBt3}>Next</button>
    </div>
  );
};

const SessionTimer = props => {
  return (
    <div className="compName">
      <h2>{props.compName}</h2>
      <h2>{props.timer}</h2>
      <div>
        <button onClick={props.funcBt1}>-</button>
        <button onClick={props.funcBt2}>+</button>
      </div>
    </div>
  );
};

export default Pomodoro;
