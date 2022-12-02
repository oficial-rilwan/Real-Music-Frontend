import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import TrackCard from "../../components/Cards/TrackCard";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import Track from "../../interface/Track";

import userService from "../../service/userService";
import styles from "./styles/styles.module.css";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SpatialAudioOutlinedIcon from "@mui/icons-material/SpatialAudioOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import { MultipleTrackLoaders } from "../../components/Loaders/Loaders";

const Library = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const { currentTrack, isPlaying, ChangePlaylistAndTrack } =
    useContext(PlayerContext);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  async function getRecentlyPlayed() {
    const { data } = await userService.getRecentlyPlayed();
    setRecentlyPlayed(data);
  }
  return (
    <div>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "8rem" }}>
          {recentlyPlayed.length === 0 && <MultipleTrackLoaders />}
          {recentlyPlayed.length > 0 && (
            <section className="trending">
              <div className="sec-title">
                <h4>Recents</h4>
                <Link to="/recently-played">More</Link>
              </div>
              <div className="items">
                {recentlyPlayed.map((item: Track, index) => (
                  <TrackCard
                    key={item?._id}
                    item={item}
                    index={index}
                    tracks={recentlyPlayed}
                    isPlaying={isPlaying}
                    currentTrack={currentTrack}
                    ChangePlaylistAndTrack={ChangePlaylistAndTrack}
                  />
                ))}
              </div>
            </section>
          )}
          <div className={styles.options}>
            <Link to="/playlist">
              <a className={styles.item}>
                <QueueMusicIcon className={styles.icon} />
                <p>Playlist</p>
                <KeyboardArrowRightIcon className={styles.viewIcon} />
              </a>
            </Link>
            <Link to="/album">
              <a className={styles.item}>
                <AlbumOutlinedIcon className={styles.icon} />
                <p>Abums</p>
                <KeyboardArrowRightIcon className={styles.viewIcon} />
              </a>
            </Link>
            <Link to="/liked-songs">
              <a className={styles.item}>
                <LibraryMusicOutlinedIcon className={styles.icon} />
                <p>Songs</p>
                <KeyboardArrowRightIcon className={styles.viewIcon} />
              </a>
            </Link>
            <Link to="/favorite-artists">
              <a className={styles.item}>
                <SpatialAudioOutlinedIcon className={styles.icon} />
                <p>Artiste</p>
                <KeyboardArrowRightIcon className={styles.viewIcon} />
              </a>
            </Link>
          </div>
        </main>
      </SiteLayout>
    </div>
  );
};

export default Library;
