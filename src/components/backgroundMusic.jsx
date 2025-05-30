import React, { useEffect, useRef } from "react";

const BackgroundMusic = ({ audioSrc }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0.1;
        audio.play();

        return () => {
      if (audioRef.current) {
        audioRef.current.pause();  // 👈 Validar antes de pausar
        audioRef.current.currentTime = 0;
      }
    };
  }, []);


    return (
        <audio ref={audioRef} src={audioSrc} />
    );
};

export default BackgroundMusic;