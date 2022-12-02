import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles/styles.module.css";
import PlaylistDialog from "../../components/Dialogs/PlaylistDialog";
import PlaylistCard from "../../components/Cards/PlaylistCard";
import { MultipleTrackLoaders } from "../../components/Loaders/Loaders";
import Playlist from "../../interface/Playlist";
import playlistService from "../../service/playlistService";
import { AuthContext } from "../../context/AuthContext";

const Playlists = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { currentTrack, isPlaying, handlePlaylistDialog } =
    useContext(PlayerContext);

  useEffect(() => {
    getPlaylists();
  }, [refresh]);

  async function getPlaylists() {
    try {
      setLoading(true);
      const { data } = await playlistService.getPlaylists();
      setPlaylists(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  return (
    <div>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "8rem" }}>
          <div className="sec-title">
            <h4>Playlist</h4>
            <button onClick={handlePlaylistDialog}>
              <AddIcon style={{ fontSize: "1.3rem" }} /> New Playlist
            </button>
          </div>
          {loading && <MultipleTrackLoaders />}
          <div className={styles.listGrid}>
            {playlists?.map((item: Playlist, index) => (
              <PlaylistCard key={item._id} index={index} playlist={item} />
            ))}
          </div>
          <PlaylistDialog refresh={() => setRefresh((prev) => !prev)} />
        </main>
      </SiteLayout>
    </div>
  );
};

export default Playlists;
