import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import styles from "./styles/styles.module.css";
import { PlayerContext } from "../../context/PlayerContext";
import TrackTable from "../../components/TracksTable";
import trackService from "../../service/trackService";
import Track from "../../interface/Track";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import { useLocation, useParams } from "react-router";

const SingleAlbum = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  useEffect(() => {
    if (!id) return;
    getData();
  }, [id]);

  async function getData() {
    try {
      const req = [
        albumService.getOneAlbum(id),
        trackService.getAlbumTracks(id),
      ];
      const res = await Promise.all(req);
      const data = res.map((item) => item?.data);
      setAlbum(data[0]);
      setTracks(data[1]?.data);
    } catch (ex: any) {}
  }

  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ marginBottom: "6rem" }}>
          <section>
            <div className={styles.banner}>
              <img src={album?.albumCover} alt={album?.name} />
              <div>
                <p>Artiste • {album?.artiste?.name}</p>
                <h2>{album?.name}</h2>
              </div>
            </div>
          </section>
          <section style={{ marginTop: 20, padding: 16 }}>
            <div className="sec-title">
              <h4>Songs</h4>
            </div>
            <TrackTable tracks={tracks} />
          </section>
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default SingleAlbum;
