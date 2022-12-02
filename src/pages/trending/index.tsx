import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import TrackCard from "../../components/Cards/TrackCard";
import Track from "../../interface/Track";
import trackService from "../../service/trackService";
import {
  MultipleTrackLoaders,
  TrackLoader,
} from "../../components/Loaders/Loaders";

const Trending = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { isPlaying, currentTrack, ChangePlaylistAndTrack } =
    useContext(PlayerContext);

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    try {
      const { data } = await trackService.getTracks();
      setTracks(data?.data);
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          {tracks.length === 0 && <MultipleTrackLoaders />}
          {tracks.length > 0 && (
            <section className="trending">
              <div className="sec-title">
                <h4>Trending now</h4>
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
          )}
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default Trending;
