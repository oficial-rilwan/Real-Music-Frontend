import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import ArtisteCard from "../../components/Cards/ArtisteCard";
import Artiste from "../../interface/Artiste";
import artisteService from "../../service/artisteService";
import {
  ArtisteLoader,
  MultipleArtisteLoaders,
} from "../../components/Loaders/Loaders";

const Artists = () => {
  const [artists, setArtists] = useState<Artiste[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    try {
      setLoading(true);
      const { data } = await artisteService.getArtists();
      setArtists(data?.data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          {loading && <MultipleArtisteLoaders />}
          <section className="trending">
            <div className="sec-title">
              <h4>Popular Artists</h4>
            </div>
            <div className="artists">
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
