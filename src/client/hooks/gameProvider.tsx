import React, {useState, useRef, createContext, useContext, Dispatch, SetStateAction} from 'react';

interface IGame {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  handleStart(): void;
  moves: number;
  incrementMoves(): void;
  resetMoves(): void;
  setMoves: Dispatch<SetStateAction<number>>;
  sound: boolean;
  volume: number;
  changeSound(): void;
  increaseVolume(): void;
  decreaseVolume(): void;
  focusedCell:object;
  setFocusedCell: Dispatch<SetStateAction<object>>;
  showScores: boolean
  setShowScores: Dispatch<SetStateAction<boolean>>;
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
  const [moves, setMoves] = useState(0);
  const countRef = useRef(null);
  const [sound, setSound] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [focusedCell, setFocusedCell] = useState(null);
  const [showScores, setShowScores] = useState(false);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

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
        setTimer,
        handleStart,
        moves,
        resetMoves,
        incrementMoves,
        setMoves,
        sound,
        changeSound,
        volume,
        increaseVolume,
        decreaseVolume,
        focusedCell,
        setFocusedCell,
        showScores,
        setShowScores
      }}
    >
      {children}
    </GameContext.Provider>
  );
};