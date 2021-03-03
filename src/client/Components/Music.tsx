import React, {useState} from "react";
import {useHotkeys} from "react-hotkeys-hook";

const MUSICURL = 'http://streaming.tdiradio.com:8000/house.mp3';

export const Music = () => {
  const [music] = useState(new Audio(MUSICURL));
  const [sound, setSound] = useState('off');
  const [musicVolume, setMusicVolume] = useState(0.5);

  function musicHandler() {
    if (sound === 'on') {
      setSound('off');
      music.pause();
    } else {
      music.volume = musicVolume;
      music.play();
      setSound('on');
    }
  }

  function increaseVolumeHandler() {
    const newV = musicVolume + 0.1 > 1 ? 1 : musicVolume + 0.1;
    setMusicVolume(newV);
    music.volume = musicVolume;
  }

  function decreaseVolumeHandler() {
    const newV = musicVolume - 0.1 < 0 ? 0 : musicVolume - 0.1;
    setMusicVolume(newV);
    music.volume = musicVolume;
  }
  useHotkeys('shift+m', musicHandler);

  return (
    <div className="music-container">
      {
        sound === 'on' ? <button onClick={decreaseVolumeHandler} value="-" className="change-volume-btn">-</button> : null
      }
      <button onClick={musicHandler}>music {sound}</button>
      {
        sound === 'on' ? <button onClick={increaseVolumeHandler} value="+" className="change-volume-btn">+</button> : null
      }
    </div>
  );
}
