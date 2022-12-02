import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";
import TrackCard from "../../components/Cards/TrackCard";
import ArtisteCard from "../../components/Cards/ArtisteCard";
import Artiste from "../../interface/Artiste";
import artisteService from "../../service/artisteService";
import Track from "../../interface/Track";
import trackService from "../../service/trackService";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import Album from "../../interface/Album";
import albumService from "../../service/albumService";
import AlbumCard from "../../components/Cards/AlbumCard";
import {
  MultipleArtisteLoaders,
  MultipleTrackLoaders,
} from "../../components/Loaders/Loaders";

import userService from "../../service/userService";
import Playlist from "../../interface/Playlist";
import playlistService from "../../service/playlistService";
import { Link } from "react-router-dom";
import PlaylistCard from "../../components/Cards/PlaylistCard";

const Home = () => {
  const { refresh, isPlaying, currentTrack, ChangePlaylistAndTrack } =
    useContext(PlayerContext);
  const token = userService.getToken();
  const [loading, setLoading] = useState(false);
  const { isConnected } = useNetworkStatus();
  const [artists, setArtists] = useState<Artiste[]>([]);
  const [favArtists, setFavArtists] = useState<Artiste[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const played = recentlyPlayed.slice(0, 4);

  useEffect(() => {
    getData();
  }, [isConnected, refresh]);
  useEffect(() => {
    if (!token) return;
    getUserData();
  }, [isConnected, refresh, token]);

  async function getData() {
    try {
      const req = [
        artisteService.getArtists(),
        albumService.getAlbums(),
        trackService.getTracks(),
      ];
      setLoading(true);
      const res = await Promise.all(req);
      setArtists(res[0]?.data?.data.slice(0, 8));
      setAlbums(res[1]?.data?.data);
      setTracks(res[2]?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  async function getUserData() {
    try {
      const req = [
        playlistService.getPlaylists(),
        userService.getFollowings(),
        userService.getRecentlyPlayed(),
      ];
      const res = await Promise.all(req);
      setPlaylists(res[0]?.data);
      setFavArtists(res[1]?.data);
      setRecentlyPlayed(res[2]?.data);
    } catch (error) {}
  }

  return (
    <div>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "8rem" }}>
          {loading && (
            <React.Fragment>
              <MultipleTrackLoaders />
              <MultipleArtisteLoaders />
            </React.Fragment>
          )}
          {!loading && (
            <React.Fragment>
              {recentlyPlayed?.length > 0 && (
                <section className="trending">
                  <div className="sec-title">
                    <h4>Recently played</h4>
                    <Link to="/recently-played">More</Link>
                  </div>
                  <div className="items">
                    {played.map((item: Track, index) => (
                      <TrackCard
                        key={item?._id}
                        item={item}
                        index={index}
                        tracks={played}
                        isPlaying={isPlaying}
                        currentTrack={currentTrack}
                        ChangePlaylistAndTrack={ChangePlaylistAndTrack}
                      />
                    ))}
                  </div>
                </section>
              )}
              {playlists?.length > 0 && (
                <section className="trending">
                  <div className="sec-title">
                    <h4>Playlists</h4>
                    <Link to="/playlist">More</Link>
                  </div>
                  <div className="playlists">
                    {playlists?.map((item: Playlist, index) => (
                      <PlaylistCard
                        key={item._id}
                        index={index}
                        playlist={item}
                      />
                    ))}
                  </div>
                </section>
              )}
              <section className="trending">
                <div className="sec-title">
                  <h4>Popular albums</h4>
                  <Link to="/album">More</Link>
                </div>
                <div className="items">
                  {albums.map((item: Album) => (
                    <AlbumCard key={item?._id} album={item} />
                  ))}
                </div>
              </section>
              <section className="trending">
                <div className="sec-title">
                  <h4>Trending now</h4>
                  <Link to="/trending">More</Link>
                </div>
                <div className="items">
                  {tracks.map((item: Track, index) => (
                    <TrackCard
                      key={item?._id}
                      item={item}
                      index={index}
                      tracks={tracks}
                      isPlaying={isPlaying}
                      currentTrack={currentTrack}
                      ChangePlaylistAndTrack={ChangePlaylistAndTrack}
                    />
                  ))}
                </div>
              </section>
              <section className="trending">
                <div className="sec-title">
                  <h4>Popular new releases</h4>
                  <Link to="/new-releases">More</Link>
                </div>
                <div className="items">
                  {tracks.map((item: Track, index) => (
                    <TrackCard
                      key={item?._id}
                      item={item}
                      index={index}
                      tracks={tracks}
                      isPlaying={isPlaying}
                      currentTrack={currentTrack}
                      ChangePlaylistAndTrack={ChangePlaylistAndTrack}
                    />
                  ))}
                </div>
              </section>
              <section className="trending">
                <div className="sec-title">
                  <h4>Popular artists</h4>
                  <Link to="/artists">More</Link>
                </div>
                <div className="artists">
                  {artists.map((item: Artiste) => (
                    <ArtisteCard key={item?._id} artiste={item} />
                  ))}
                </div>
              </section>
              {favArtists?.length > 0 && (
                <section className="trending">
                  <div className="sec-title">
                    <h4>Your favorites artists</h4>
                    <Link to="/favorite-artists">More</Link>
                  </div>
                  <div className="artists">
                    {favArtists.map((item: Artiste) => (
                      <ArtisteCard key={item?._id} artiste={item} />
                    ))}
                  </div>
                </section>
              )}
            </React.Fragment>
          )}
        </main>
      </SiteLayout>
    </div>
  );
};

export default Home;
