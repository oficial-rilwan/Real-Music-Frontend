import React, { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import LinearProgress from "@mui/material/LinearProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";
import { PlayerContext } from "../../context/PlayerContext";
import userService from "../../service/userService";
import { AuthContext } from "../../context/AuthContext";
import MobilePlayer from "./MobilePlayer";

const Player = () => {
  const [mobilePlayer, setMobilePlayer] = useState(false);
  const { user, refreshDetails } = useContext(AuthContext);
  const {
    next,
    prev,
    playPause,
    isPlaying,
    volume,
    handleVolume,
    seek,
    duration,
    currentTime,
    handleSeek,
    currentTrack,
  } = useContext(PlayerContext);

  async function likeSong() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.likeSong(currentTrack?._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function unlikeSong() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.unlikeSong(currentTrack?._id);
      refreshDetails();
    } catch (ex) {}
  }

  function handleMobilePlayer() {
    if (mobilePlayer) setMobilePlayer(false);
    else setMobilePlayer(true);
  }

  return (
    <div className="player">
      <div className="track-details">
        <div onClick={handleMobilePlayer}>
          <img src={currentTrack?.poster} />
        </div>

        <div onClick={handleMobilePlayer}>
          <p>{currentTrack?.name}</p>
          <small>{currentTrack?.artiste.name}</small>
        </div>
        {currentTrack?._id && user?.likes?.includes(currentTrack?._id) ? (
          <IconButton onClick={unlikeSong}>
            <FavoriteIcon className="icon" />
          </IconButton>
        ) : (
          <IconButton onClick={likeSong}>
            <FavoriteBorderIcon className="icon" />
          </IconButton>
        )}
        {isPlaying ? (
          <button className="play-sm" onClick={playPause}>
            <PauseIcon />
          </button>
        ) : (
          <button className="play-sm" onClick={playPause}>
            <PlayArrowIcon />
          </button>
        )}
      </div>
      <div className="controls">
        <div className="first">
          <IconButton>
            <ShuffleIcon className="icon" />
          </IconButton>

          <IconButton onClick={prev}>
            <SkipPreviousIcon className="icon" style={{ fontSize: "2rem" }} />
          </IconButton>

          {isPlaying ? (
            <button className="play" onClick={playPause}>
              <PauseIcon />
            </button>
          ) : (
            <button className="play" onClick={playPause}>
              <PlayArrowIcon />
            </button>
          )}

          <IconButton onClick={next}>
            <SkipNextIcon className="icon" style={{ fontSize: "2rem" }} />
          </IconButton>

          <IconButton>
            <RepeatIcon className="icon" />
          </IconButton>
        </div>
        <div className="second">
          <div>{currentTime}</div>
          <Slider
            value={seek}
            onChange={handleSeek}
            style={{ marginTop: "-6px !important" }}
            aria-label="Seek"
          />
          <div>{duration}</div>
        </div>
      </div>
      <div className="volume">
        <VolumeDown />
        <Slider
          style={{ width: 120, marginTop: "-6px !important", color: "#333" }}
          aria-label="Volume"
          value={volume}
          onChange={handleVolume}
        />
        <VolumeUp />
      </div>
      <div className="seek-progress" onClick={handleMobilePlayer}>
        <LinearProgress
          className="progress"
          variant="determinate"
          value={seek}
        />
      </div>
      <MobilePlayer open={mobilePlayer} handlePlayer={handleMobilePlayer} />
    </div>
  );
};

export default Player;
