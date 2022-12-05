import React, { useContext, useState } from "react";
import AddAlbum from "../../../components/AdminComponents/AddAlbums";
import AlbumList from "../../../components/AdminComponents/AlbumList";
import Layout from "../../../components/AdminLayout/Layout";
import { PlayerContext } from "../../../context/PlayerContext";
import styles from "./styles/styles.module.css";

const AdminAlbum = () => {
  const { isPlaying, currentTrack } = useContext(PlayerContext);
  const [refresh, setRefresh] = useState(false);
  return (
    <React.Fragment>
      <Layout>
        <div>
          <div className={styles.trackGrid}>
            <div className={`${styles.gridItem} ${styles.first}`}>
              <AddAlbum setRefresh={setRefresh} styles={styles} />
            </div>
            <div className={styles.gridItem}>
              <AlbumList refresh={refresh} styles={styles} />
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default AdminAlbum;
