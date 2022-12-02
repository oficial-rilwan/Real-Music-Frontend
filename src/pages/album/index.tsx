import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import AlbumCard from "../../components/Cards/AlbumCard";
import { TrackLoader } from "../../components/Loaders/Loaders";

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    try {
      const { data } = await albumService.getAlbums();
      setAlbums(data?.data);
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          <section className="trending">
            <div className="sec-title">
              <h4>Popular Albums</h4>
            </div>
            <div className="items">
              {albums.length === 0 && <TrackLoader count={8} />}
              {albums?.map((item: Album) => (
                <AlbumCard key={item?._id} album={item} />
              ))}
            </div>
          </section>
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default Albums;
