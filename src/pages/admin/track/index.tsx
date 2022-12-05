import React, { useContext, useState } from "react";
import Layout from "../../../components/AdminLayout/Layout";
import styles from "./styles/styles.module.css";
import AddTrack from "../../../components/AdminComponents/AddTrack";
import TrackList from "../../../components/AdminComponents/TrackList";
import { PlayerContext } from "../../../context/PlayerContext";

const AdminTrack = () => {
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  const [refresh, setRefresh] = useState(false);
  return (
    <React.Fragment>
      <Layout>
        <div>
          <div className={styles.trackGrid}>
            <div className={`${styles.gridItem} ${styles.first}`}>
              <AddTrack setRefresh={setRefresh} styles={styles} />
            </div>
            <div className={styles.gridItem}>
              <TrackList refresh={refresh} styles={styles} />
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default AdminTrack;
