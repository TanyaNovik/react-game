import React, {useState, useRef, createContext, useContext} from 'react';

interface IGame {
  timer: number;
  // isActive: boolean;
  // isPaused: boolean;
  handleStart(): void;

  // handlePause(): void;
  // handleResume(): void;
  // handleReset(): void;
  moves: number;

  incrementMoves(): void;

  resetMoves(): void;

  sound: boolean;
  volume: number;
  changeSound(): void;
  increaseVolume(): void;
  decreaseVolume(): void;
}

interface IProps {
  children: React.ReactNode;
}

export const GameContext = createContext<IGame>(null);

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider: React.FC = ({children}: IProps) => {
  const [timer, setTimer] = useState(0);
  // const [isActive, setIsActive] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);
  const [moves, setMoves] = useState(0);
  const countRef = useRef(null);
  const [sound, setSound] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const handleStart = () => {
    // setIsActive(true);
    // setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  // const handlePause = () => {
  //   clearInterval(countRef.current);
  //   setIsPaused(false);
  // };
  //
  // const handleResume = () => {
  //   setIsPaused(true);
  //   countRef.current = setInterval(() => {
  //     setTimer((timer) => timer + 1);
  //   }, 1000);
  // };
  //
  // const handleReset = () => {
  //   clearInterval(countRef.current);
  //   setIsActive(false);
  //   setIsPaused(false);
  //   setTimer(0);
  // };

  const incrementMoves = () => {
    setMoves((mv) => mv + 1);
  };

  const resetMoves = () => {
    setMoves(0);
  };
  const changeSound = () => {
    setSound(!sound);
  }
  const increaseVolume = () => {
    const newV = volume + 0.1 > 1 ? 1 : volume + 0.1;
    setVolume(newV);
  }

  const decreaseVolume = () => {
    const newV = volume - 0.1 < 0 ? 0 : volume - 0.1;
    setVolume(newV);
  }
  return (
    <GameContext.Provider
      value={{
        timer,
        // isActive,
        // isPaused,
        handleStart,
        // handlePause,
        // handleResume,
        // handleReset,
        moves,
        resetMoves,
        incrementMoves,
        sound,
        changeSound,
        volume,
        increaseVolume,
        decreaseVolume

      }}
    >
      {children}
    </GameContext.Provider>
  );
};