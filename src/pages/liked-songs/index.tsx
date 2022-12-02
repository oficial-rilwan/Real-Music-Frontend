import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";
import TrackTable from "../../components/TracksTable";
import Track from "../../interface/Track";
import userService from "../../service/userService";
import { AuthContext } from "../../context/AuthContext";
import styles from "./styles/styles.module.css";

const LikedSongs = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    try {
      const { data } = await userService.getLikedSongs();
      setTracks(data);
    } catch (ex) {}
  }
  return (
    <div>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "8rem" }}>
          <section>
            <div className={styles.presentation}>
              <img src="/assets/liked.png" alt="Your Favorites" />
              <div className={styles.text}>
                <p>Your Favorites</p>
                <small>This includes songs you have liked</small>
              </div>
            </div>
            <div>
              <TrackTable tracks={tracks} />
            </div>
          </section>
        </main>
      </SiteLayout>
    </div>
  );
};

export default LikedSongs;
