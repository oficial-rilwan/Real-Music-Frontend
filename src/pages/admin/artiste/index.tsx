import React, { useContext, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import styles from "./styles/styles.module.css";
import AddTrack from "../../../components/AdminComponents/AddTrack";
import TrackList from "../../../components/AdminComponents/TrackList";
import AddArtiste from "../../../components/AdminComponents/AddArtiste";
import ArtistList from "../../../components/AdminComponents/ArtistList";
import { PlayerContext } from "../../../context/PlayerContext";

const AdminArtiste = () => {
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  const [refresh, setRefresh] = useState(false);
  return (
    <React.Fragment>
      <Layout>
        <div>
          <div className={styles.trackGrid}>
            <div className={`${styles.gridItem} ${styles.first}`}>
              <AddArtiste setRefresh={setRefresh} styles={styles} />
            </div>
            <div className={styles.gridItem}>
              <ArtistList refresh={refresh} styles={styles} />
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default AdminArtiste;
