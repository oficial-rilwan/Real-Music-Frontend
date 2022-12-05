import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import styles from "./styles/styles.module.css";
import { PlayerContext } from "../../context/PlayerContext";
import TrackTable from "../../components/TracksTable";
import Artiste from "../../interface/Artiste";
import artisteService from "../../service/artisteService";
import trackService from "../../service/trackService";
import Track from "../../interface/Track";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import { TrackLoader } from "../../components/Loaders/Loaders";
import AlbumCard from "../../components/Cards/AlbumCard";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../service/userService";
import { useParams } from "react-router";

const SingleArtiste = () => {
  const { id } = useParams();
  const { user, refreshDetails } = useContext(AuthContext);
  const { isPlaying, currentTrack } = useContext(PlayerContext);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artiste, setArtiste] = useState<Artiste | null>(null);

  useEffect(() => {
    if (!id) return;
    getArtiste();
    getTracks();
    getAlbums();
  }, [id]);

  async function getArtiste() {
    try {
      const { data } = await artisteService.getOneArtiste(id);
      setArtiste(data?.data);
    } catch (ex: any) {}
  }

  async function getTracks() {
    try {
      const { data } = await trackService.getArtisteTracks(id);
      setTracks(data?.data);
    } catch (ex: any) {}
  }

  async function getAlbums() {
    try {
      const { data } = await albumService.getArtisteAlbums(id);
      setAlbums(data);
    } catch (ex: any) {}
  }

  async function followArtiste() {
    try {
      await userService.followArtiste(artiste?._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function unfollowArtiste() {
    try {
      await userService.unfollowArtiste(artiste?._id);
      refreshDetails();
    } catch (ex) {}
  }

  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ marginBottom: "7rem", padding: 16 }}>
          <section>
            <div className={styles.banner}>
              <div>
                <img src={artiste?.image} alt={artiste?.name} />
              </div>
              <div className={styles.text}>
                <p>Artiste</p>
                <h2>{artiste?.name}</h2>
                {user?.followings?.includes(artiste?._id || "") ? (
                  <button onClick={unfollowArtiste}>FOLLOWING</button>
                ) : (
                  <button onClick={followArtiste}>FOLLOW</button>
                )}
              </div>
            </div>
          </section>
          <section style={{ marginTop: 20 }}>
            <div className="sec-title">
              <h4>Songs</h4>
            </div>
            <TrackTable tracks={tracks} />
          </section>
          <section style={{ marginTop: 20 }} className="trending">
            <div className="sec-title">
              <h4>Albums</h4>
            </div>
            <div className="items">
              {albums.length === 0 && <TrackLoader count={8} />}
              {albums.map((item: Album) => (
                <AlbumCard key={item?._id} album={item} />
              ))}
            </div>
          </section>
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default SingleArtiste;
