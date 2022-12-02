import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import ArtisteCard from "../../components/Cards/ArtisteCard";
import Artiste from "../../interface/Artiste";
import artisteService from "../../service/artisteService";
import { ArtisteLoader } from "../../components/Loaders/Loaders";

const Artists = () => {
  const [artists, setArtists] = useState<Artiste[]>([]);

  const { isPlaying, currentTrack, ChangePlaylistAndTrack } =
    useContext(PlayerContext);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    try {
      const { data } = await artisteService.getArtists();
      setArtists(data?.data);
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          <section className="trending">
            <div className="sec-title">
              <h4>Popular Artists</h4>
            </div>
            <div className="items">
              {artists.length === 0 && <ArtisteLoader count={8} />}
              {artists?.map((item: Artiste) => (
                <ArtisteCard key={item?._id} artiste={item} />
              ))}
            </div>
          </section>
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default Artists;
