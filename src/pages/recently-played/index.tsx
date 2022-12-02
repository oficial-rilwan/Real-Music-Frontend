import React, { useContext, useState, useEffect } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import TrackCard from "../../components/Cards/TrackCard";
import Track from "../../interface/Track";
import {
  MultipleTrackLoaders,
  TrackLoader,
} from "../../components/Loaders/Loaders";
import userService from "../../service/userService";

const RecentlyPlayed = () => {
  const [loading, setLoading] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const { isPlaying, currentTrack, ChangePlaylistAndTrack } =
    useContext(PlayerContext);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  async function getRecentlyPlayed() {
    try {
      setLoading(true);
      const { data } = await userService.getRecentlyPlayed();
      setRecentlyPlayed(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          {loading && <MultipleTrackLoaders />}
          {!loading && (
            <section className="trending">
              <div className="sec-title">
                <h4>Recently played</h4>
              </div>
              <div className="items">
                {recentlyPlayed.map((item: Track, index) => (
                  <TrackCard
                    key={item?._id}
                    item={item}
                    index={index}
                    tracks={recentlyPlayed}
                    isPlaying={isPlaying}
                    currentTrack={currentTrack}
                    ChangePlaylistAndTrack={ChangePlaylistAndTrack}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default RecentlyPlayed;
