import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";
import styles from "./styles/styles.module.css";
import TrackTable from "../../components/TracksTable";
import Track from "../../interface/Track";
import trackService from "../../service/trackService";
import Playlist from "../../interface/Playlist";
import playlistService from "../../service/playlistService";

import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";

const SinglePlaylist = () => {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  useEffect(() => {
    if (!id) return;
    getPlaylist();
  }, [id]);

  async function getPlaylist() {
    try {
      const { data } = await playlistService.getOnePlaylist(id);
      setPlaylist(data);
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
                <p>{playlist?.name}</p>
                <small>This includes songs in {playlist?.name}</small>
              </div>
            </div>

            <div>
              <TrackTable tracks={playlist?.tracks} />
            </div>
          </section>
        </main>
      </SiteLayout>
    </div>
  );
};

export default SinglePlaylist;
