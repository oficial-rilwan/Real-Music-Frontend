import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import ArtisteCard from "../../components/Cards/ArtisteCard";
import Artiste from "../../interface/Artiste";
import {
  ArtisteLoader,
  MultipleArtisteLoaders,
} from "../../components/Loaders/Loaders";
import userService from "../../service/userService";
import NoDataFeedback from "../../components/Feedback/NoDataFeedback";

const FavoriteArtists = () => {
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<Artiste[]>([]);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    try {
      setLoading(true);
      const { data } = await userService.getFollowings();
      setArtists(data);
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
          {!loading && artists?.length === 0 && <NoDataFeedback />}
          {artists.length > 0 && (
            <section className="trending">
              <div className="sec-title">
                <h4>Favorite Artists</h4>
              </div>
              <div className="artists">
                {artists?.map((item: Artiste) => (
                  <ArtisteCard key={item?._id} artiste={item} />
                ))}
              </div>
            </section>
          )}
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default FavoriteArtists;
