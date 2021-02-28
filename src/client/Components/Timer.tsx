import React, {useRef, useState} from "react";
import {formatTime} from "../helpers/timerHelper";

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000);

  return (
      <React.Fragment>
        {console.log('timer')}
        {console.log(timer)}

        <p>{formatTime(timer)}</p>
      </React.Fragment>
  );
}
