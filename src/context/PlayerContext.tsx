import { createContext, useContext, useEffect, useRef, useState } from "react";
import Track from "../interface/Track";
import userService from "../service/userService";
import { AuthContext } from "./AuthContext";

const ls: any = localStorage || null;
let controlState: any = ls ? JSON.parse(ls?.getItem("player-state")) : null;

interface PlayerContextProviderProps {
  children: JSX.Element;
}
interface PlayerContext {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  seek: number;
  currentTrack: Track | null;
  playlist: Track[];
  duration: string;
  currentTime: string;
  refresh: boolean;
  currentTrackIndex: number;
  playPause: () => void;
  mute: () => void;
  next: () => void;
  prev: () => void;
  setCurrentTrack: any;
  handleVolume: (_: any, value: any) => void;
  handleSeek: (_: any, value: any) => void;
  ChangePlaylistAndTrack: (data: Track[], index: number) => void;
  switchTrack: () => void;
  pauseCurrentTrack: () => void;
  seekTimeUpdate: () => void;
  playlistDialog: boolean;
  handlePlaylistDialog: () => void;
}

export const PlayerContext = createContext({} as PlayerContext);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const { user } = useContext(AuthContext);
  const audio: any = useRef();
  const [refresh, setRefresh] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistDialog, setPlaylistDialog] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [seek, setSeek] = useState<number>(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  let title: any = document.querySelector("title");
  if (isPlaying) title.textContent = currentTrack?.name;
  else title.textContent = "Real Music App";

  let curmins: number | string =
    Math.floor(audio?.current?.currentTime / 60) || 0;
  let cursecs: number | string =
    Math.floor(audio?.current?.currentTime - curmins * 60) || 0;
  let durmins: number | string = Math.floor(audio?.current?.duration / 60) || 0;
  let dursecs: number | string =
    Math.floor(audio?.current?.duration - durmins * 60) || 0;

  if (curmins < 10) curmins = `${curmins}`;
  if (cursecs < 10) cursecs = `0${cursecs}`;
  if (durmins < 10) durmins = `${durmins}`;
  if (dursecs < 10) dursecs = `0${dursecs}`;

  useEffect(() => {
    if (!ls || !controlState) return;
    setVolume(controlState?.volume);
    audio.current.volume = controlState?.volume / 100;
    setCurrentTrack(
      controlState?.currentPlaylist[controlState?.currentTrackIndex]
    );
    setCurrentTrackIndex(controlState?.currentTrackIndex);
    setPlaylist(controlState?.currentPlaylist);
  }, [controlState]);

  useEffect(() => {
    if (playlist.length === 0) return;
    if (isPlaying) {
      audio.current.src = playlist[currentTrackIndex]?.url;
      audio.current
        .play()
        .then((_: any) => console.log("playing"))
        .catch((error: any) => console.log(error));
    } else {
      audio.current.src = playlist[currentTrackIndex]?.url;
      audio.current.pause();
    }
  }, [currentTrackIndex]);

  // useEffect(() => {
  //   if (playlistDialog) return;
  //   window.addEventListener("keydown", playOnClickSpace);
  //   return () => window.removeEventListener("keydown", playOnClickSpace);
  // }, [isPlaying, playlistDialog]);

  useEffect(() => {
    const data = {
      volume,
      currentTrackIndex,
      currentPlaylist: playlist,
    };
    ls?.setItem("player-state", JSON.stringify(data));
  }, [volume, currentTrackIndex, playlist]);

  useEffect(() => {
    if (!currentTrack || !currentTrack?.url) return;
    window.navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack?.name,
      artist: currentTrack?.artiste?.name,
      artwork: [{ src: currentTrack?.poster }],
    });
    window.navigator.mediaSession.setActionHandler("play", playPause);
    window.navigator.mediaSession.setActionHandler("pause", playPause);
    window.navigator.mediaSession.setActionHandler("seekbackward", prev);
    window.navigator.mediaSession.setActionHandler("seekforward", next);
  }, [currentTrack, isPlaying, currentTrackIndex]);

  async function addToRecentlyPlayed(trackId: string) {
    try {
      await userService.addToRecentlyPlayed(trackId);
      setRefresh((prev) => !prev);
    } catch (ex) {}
  }

  function playOnClickSpace(e: KeyboardEvent) {
    if (e.code === "Space") {
      playPause();
    }
  }

  function handlePlaylistDialog() {
    setPlaylistDialog((prev) => !prev);
  }
  function playPause() {
    if (!user) return window.location.assign("/auth");
    if (!isPlaying) {
      setIsPlaying(true);
      audio.current
        .play()
        .then((_: any) => console.log("playing"))
        .catch((error: any) => console.log(error));
    } else {
      setIsPlaying(false);
      audio.current.pause();
    }
  }

  function mute() {
    if (!user) return window.location.assign("/auth");
    if (isMuted) {
      audio.current.muted = false;
      setIsMuted(false);
    } else {
      audio.current.muted = true;
      setIsMuted(true);
    }
  }
  function next() {
    if (!user) return window.location.assign("/auth");
    if (currentTrackIndex === playlist.length - 1) {
      setCurrentTrackIndex(0);
      setCurrentTrack(playlist[0]);
    } else {
      setCurrentTrackIndex((prev) => prev + 1);
      setCurrentTrack(playlist[currentTrackIndex + 1]);
    }
  }

  function prev() {
    if (!user) return window.location.assign("/auth");
    if (currentTrackIndex === 0) return;
    else {
      setCurrentTrackIndex((prev) => prev - 1);
      setCurrentTrack(playlist[currentTrackIndex - 1]);
    }
  }

  function handleVolume(_: any, value: any) {
    if (!user) return window.location.assign("/auth");
    setVolume(value);
    audio.current.volume = value / 100;
  }

  function handleSeek(_: any, value: any) {
    if (!user) return window.location.assign("/auth");
    setSeek(value);
    let seekTo = audio.current.duration * (value / 100);
    audio.current.currentTime = seekTo;
  }

  function switchTrack() {
    if (!user) return window.location.assign("/auth");
    try {
      if (currentTrackIndex === playlist?.length - 1) {
        setCurrentTrackIndex(0);
        setCurrentTrack(playlist[0]);
      } else {
        setCurrentTrackIndex((prev) => prev + 1);
        setCurrentTrack(playlist[currentTrackIndex + 1]);
      }
      if (currentTrack) {
        addToRecentlyPlayed(currentTrack?._id);
        audio.current.src = `${playlist[currentTrackIndex].url}`;
        audio.current
          .play()
          .then((_: any) => console.log("playing"))
          .catch((error: any) => console.log(error));
      }
    } catch (ex) {}
  }

  function seekTimeUpdate() {
    if (!user) return window.location.assign("/auth");
    let nt = audio.current.currentTime * (100 / audio.current.duration);
    setSeek(nt);
  }
  function ChangePlaylistAndTrack(data: Track[], index: number) {
    if (!user) return window.location.assign("/auth");
    if (!isPlaying && currentTrack?._id === data[index]?._id) {
      setIsPlaying(true);
      audio.current
        .play()
        .then((_: any) => console.log("playing"))
        .catch((error: any) => console.log(error));
    } else if (isPlaying && currentTrack?._id === data[index]?._id) {
      setIsPlaying(false);
      audio.current.pause();
    } else if (currentTrack?._id !== data[index]?._id) {
      setIsPlaying(true);
      setPlaylist(data);
      setCurrentTrack(data[index]);
      setCurrentTrackIndex(index);
      audio.current.src = `${data[index].url}`;
      audio.current
        .play()
        .then((_: any) => console.log("playing"))
        .catch((error: any) => console.log(error));
    } else {
      audio.current.pause();
    }
  }
  function pauseCurrentTrack() {
    if (!user) return window.location.assign("/auth");
    setIsPlaying(false);
    audio.current.pause();
  }
  return (
    <PlayerContext.Provider
      value={{
        playPause,
        mute,
        next,
        prev,
        refresh,
        playlistDialog,
        handlePlaylistDialog,
        setCurrentTrack,
        handleVolume,
        handleSeek,
        switchTrack,
        seekTimeUpdate,
        pauseCurrentTrack,
        ChangePlaylistAndTrack,

        currentTrack,
        isPlaying,
        isMuted,
        volume,
        seek,
        playlist,
        currentTrackIndex,
        duration: `${durmins}.${dursecs}`,
        currentTime: `${curmins}.${cursecs}`,
      }}
    >
      <audio
        style={{ display: "none" }}
        controls
        ref={audio}
        onEnded={switchTrack}
        onTimeUpdate={seekTimeUpdate}
      />
      {children}
    </PlayerContext.Provider>
  );
};
