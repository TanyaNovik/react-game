import React from "react";
import {formatTime} from "../helpers/timerHelper";
import {useGame} from "../hooks/gameProvider";

export const Timer = () => {
  const {timer} =useGame();

  return (
      <React.Fragment>

        <span>{formatTime(timer)}</span>
      </React.Fragment>
  );
}
