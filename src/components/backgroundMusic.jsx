import React, { useEffect, useRef } from "react";

const BackgroundMusic = ({ audioSrc }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0.1;
        audio.play();

        return () => {
            const audio = audioRef.current;
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audioSrc]);


    return (
        <audio ref={audioRef} src={audioSrc} />
    );
};

export default BackgroundMusic;