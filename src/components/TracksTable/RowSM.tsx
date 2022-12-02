import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Track from "../../interface/Track";
import useTrackDuration from "../../hooks/useTrackDuration";
import { PlayerContext } from "../../context/PlayerContext";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../service/userService";

interface TableRowProps {
  index: number;
  styles: any;
  item: Track;
  tracks: Track[];
  handleClick: (event: any) => void;
  handleTrackSelect: (track: Track) => void;
}

const RowSM = ({
  index,
  styles,
  item,
  tracks,
  handleClick,
  handleTrackSelect,
}: TableRowProps) => {
  const { isPlaying, currentTrack, ChangePlaylistAndTrack, pauseCurrentTrack } =
    useContext(PlayerContext);
  const { user, refreshDetails } = useContext(AuthContext);

  const { duration } = useTrackDuration(item?.url);

  async function likeSong() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.likeSong(item._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function unlikeSong() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.unlikeSong(item._id);
      refreshDetails();
    } catch (ex) {}
  }
  return (
    <div className={styles.trackItem}>
      <div className={`${styles.details} ${styles.detailsSM}`}>
        <span className={styles.playSec}>
          {currentTrack?._id !== item?._id && (
            <IconButton
              size="small"
              className={styles.playPause}
              onClick={() => ChangePlaylistAndTrack(tracks, index)}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
          {isPlaying && currentTrack?._id === item?._id ? (
            <IconButton size="small" onClick={pauseCurrentTrack}>
              <PauseIcon />
            </IconButton>
          ) : !isPlaying && currentTrack?._id === item?._id ? (
            <IconButton
              size="small"
              onClick={() => ChangePlaylistAndTrack(tracks, index)}
            >
              <PlayArrowIcon />
            </IconButton>
          ) : (
            <span className={styles.index}>{index + 1}</span>
          )}
        </span>
        <img src={item?.poster} alt={item?.name} />
        <span className={styles.trackInfo}>
          <span>{item?.name}</span>
          <span>
            <Link to={`/artists/${item?.artiste?._id}`}>
              {item?.artiste?.name}
            </Link>
          </span>
        </span>
      </div>

      <div className={`${styles.actions} ${styles.actionsSM}`}>
        {/* {isPlaying && currentTrack?._id === item?._id ? (
          <IconButton
            className={styles.scIcon}
            size="small"
            onClick={pauseCurrentTrack}
          >
            <PauseIcon />
          </IconButton>
        ) : (
          <IconButton
            className={styles.scIcon}
            size="small"
            onClick={() => ChangePlaylistAndTrack(tracks, index)}
          >
            <PlayArrowIcon />
          </IconButton>
        )} */}
        {item?._id && user?.likes?.includes(item?._id) ? (
          <Tooltip title="Remove from favorites">
            <IconButton
              onClick={unlikeSong}
              className={`${styles.icon} ${styles.hide}`}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add to favorites">
            <IconButton
              onClick={likeSong}
              className={`${styles.icon} ${styles.hide}`}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}
        <span className={`${styles.hide}`}>{duration}</span>
        {user && (
          <IconButton
            onClick={(e) => {
              handleClick(e);
              handleTrackSelect(item);
            }}
            className={styles.icon}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default RowSM;
