import React, { useContext } from "react";
import styles from "./styles/styles.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { PlayerContext } from "../../context/PlayerContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Slider } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../service/userService";
import { useNavigate } from "react-router-dom";

const MobilePlayer = () => {
  const {
    next,
    prev,
    playPause,
    isPlaying,
    seek,
    duration,
    currentTime,
    handleSeek,
    currentTrack,
  } = useContext(PlayerContext);
  const { user, refreshDetails } = useContext(AuthContext);
  const navigate = useNavigate();

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
  return (
    <div className={styles.player}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.returnIcon}>
          <KeyboardArrowLeftIcon className="icon" />
        </button>
        <p>Now Playing</p>
      </div>
      <div className={styles.poster}>
        <img src={currentTrack?.poster} />
      </div>
      <div className={styles.info}>
        {currentTrack?._id && user?.likes?.includes(currentTrack?._id) ? (
          <IconButton onClick={unlikeSong}>
            <FavoriteIcon className="icon" />
          </IconButton>
        ) : (
          <IconButton onClick={likeSong}>
            <FavoriteBorderIcon className="icon" />
          </IconButton>
        )}
        <div>
          <p>{currentTrack?.name}</p>
          <small>{currentTrack?.artiste?.name}</small>
        </div>
        <ShareIcon />
      </div>
      <div className={styles.playDetails}>
        <div className={styles.slider}>
          <Slider
            value={seek}
            onChange={handleSeek}
            style={{ marginTop: "-6px !important" }}
            aria-label="Seek"
          />
        </div>
        <div className={styles.time}>
          <div>{currentTime}</div>
          <div>{duration}</div>
        </div>
      </div>
      <div className={styles.action}>
        <IconButton>
          <ShuffleIcon className={styles.iconSm} />
        </IconButton>

        <IconButton onClick={prev}>
          <SkipPreviousIcon className={styles.iconMd} />
        </IconButton>

        {isPlaying ? (
          <button className={styles.play} onClick={playPause}>
            <PauseIcon />
          </button>
        ) : (
          <button className={styles.play} onClick={playPause}>
            <PlayArrowIcon />
          </button>
        )}

        <IconButton onClick={next}>
          <SkipNextIcon className={styles.iconMd} />
        </IconButton>

        <IconButton>
          <RepeatIcon className={styles.iconSm} />
        </IconButton>
      </div>
    </div>
  );
};

export default MobilePlayer;
