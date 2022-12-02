import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { Avatar } from "@mui/material";
import { PlayerContext } from "../../context/PlayerContext";

import styles from "./styles/styles.module.css";
import artisteService from "../../service/artisteService";
import trackService from "../../service/trackService";
import Artiste from "../../interface/Artiste";
import Track from "../../interface/Track";
import ArtisteCard from "../../components/Cards/ArtisteCard";
import TrackTableSM from "../../components/TracksTable/TrackTableSM";

import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import AlbumCard from "../../components/Cards/AlbumCard";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Search = () => {
  const query: any = new URLSearchParams(useLocation().search);

  const searchQuery: string | string[] | undefined = query.get("keyword");
  const { isPlaying, currentTrack } = useContext(PlayerContext);
  const [artists, setArtists] = useState<Artiste[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>(null);

  useEffect(() => {
    if (!searchQuery) return;
    getArtists();
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) return;
    getSongs();
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) return;
    getAlbums();
  }, [searchQuery]);

  async function getSongs() {
    try {
      const { data } = await trackService.search(searchQuery);
      setTracks(data?.data);
    } catch (ex) {}
  }

  async function getArtists() {
    try {
      const { data } = await artisteService.search(searchQuery);
      setArtists(data?.data.slice(0, 5));
    } catch (ex) {}
  }

  async function getAlbums() {
    try {
      const { data } = await albumService.search(searchQuery);
      setAlbums(data?.data.slice(0, 5));
    } catch (ex) {}
  }

  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          {searchQuery &&
            tracks?.length === 0 &&
            artists?.length === 0 &&
            albums?.length === 0 && (
              <div style={{ textAlign: "center" }}>
                <SearchIcon style={{ fontSize: "2.5rem" }} />
                <p style={{ fontSize: 20 }}>
                  Check your spelling, or search for something else
                </p>
                <p style={{ fontSize: 14 }}>
                  Try searching for something else.
                </p>
              </div>
            )}
          {searchQuery && (
            <React.Fragment>
              {tracks && tracks?.length > 0 && (
                <div className={styles.searchGrid}>
                  <div className={styles.wrapper}>
                    <h4
                      style={{
                        fontSize: "1.5rem",
                        marginBottom: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Top result
                    </h4>
                    <Link to="/liked-songs">
                      <div>
                        <div className={styles.item}>
                          <div className={styles.content}>
                            <div>
                              <Avatar
                                className={styles.artisteAvatar}
                                src={tracks[0]?.poster}
                                alt={tracks[0]?.artiste?.name}
                              />

                              <h2>{tracks[0]?.artiste?.name}</h2>
                              <p>{tracks[0]?.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "1.5rem",
                        marginBottom: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {tracks.length > 0 && "Songs"}
                    </h4>
                    <TrackTableSM tracks={tracks?.slice(0, 4)} />
                  </div>
                </div>
              )}
              <section className="trending">
                <div className="sec-title">
                  {artists && artists?.length > 0 && <h4>Artists</h4>}
                </div>
                <div className="items">
                  {artists?.map((item: Artiste) => (
                    <ArtisteCard key={item?._id} artiste={item} />
                  ))}
                </div>
              </section>
              <section className="trending">
                <div className="sec-title">
                  {albums && albums?.length > 0 && <h4>Albums</h4>}
                </div>
                <div className="items">
                  {albums?.map((item: Album) => (
                    <AlbumCard key={item?._id} album={item} />
                  ))}
                </div>
              </section>
            </React.Fragment>
          )}
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default Search;
