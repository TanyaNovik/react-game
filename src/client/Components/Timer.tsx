import React from "react";
import {formatTime} from "../helpers/timerHelper";
import {useGame} from "../hooks/gameProvider";

export const Timer = () => {
  const {timer} =useGame();

  return (
      <React.Fragment>
        {console.log('timer')}

        <p>{formatTime(timer)}</p>
      </React.Fragment>
  );
}
