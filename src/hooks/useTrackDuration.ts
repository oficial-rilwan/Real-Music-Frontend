import { useEffect, useState } from "react";

const useTrackDuration = (url: string) => {
  const [duration, setDuration] = useState("");

  const audio = new Audio();
  audio.src = url;

  useEffect(() => {
    if (!url) return;
    audio.addEventListener("loadedmetadata", loadedData, false);
    return () => audio.removeEventListener("loadedmetadata", loadedData);
  }, [url]);

  let durmins: number | string = "";
  let dursecs: number | string = "";

  function loadedData() {
    durmins = Math.floor(audio.duration / 60) || 0;
    dursecs = Math.floor(audio.duration - durmins * 60) || 0;
    if (durmins < 10) durmins = `${durmins}`;
    if (dursecs < 10) dursecs = `0${dursecs}`;
    setDuration(`${durmins}:${dursecs}`);
  }

  return { duration };
};

export default useTrackDuration;
