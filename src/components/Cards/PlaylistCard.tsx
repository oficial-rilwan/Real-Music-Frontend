import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import Playlist from "../../interface/Playlist";
import Track from "../../interface/Track";
import styles from "./styles/styles.module.css";

interface PlaylistProps {
  playlist: Playlist;
  index: number;
}

const PlaylistCard = ({ playlist, index }: PlaylistProps) => {
  const { user } = useContext(AuthContext);
  return (
    <Link to={`/playlist/${playlist?._id}`}>
      <div>
        <div className={styles.trackGrid}>
          {playlist.tracks.length < 4 && (
            <div className={styles.empty_list}>
              <PlaylistPlayIcon className={styles.icon} />
            </div>
          )}
          {playlist?.tracks?.length >= 4 && (
            <div className={styles.trackItem}>
              {playlist.tracks?.slice(0, 4)?.map((item: Track) => (
                <div key={item?._id} className={styles.img_box}>
                  <img src={item?.poster} alt={item.name} />
                </div>
              ))}
            </div>
          )}
          <div className={styles.content}>
            <p>{playlist?.name}</p>
            <small>By {user?.name}</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
