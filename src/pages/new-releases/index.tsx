import React, { useContext, useEffect, useState } from "react";
import SiteLayout from "../../components/Layout/SiteLayout";
import { PlayerContext } from "../../context/PlayerContext";

import TrackCard from "../../components/Cards/TrackCard";
import Track from "../../interface/Track";
import trackService from "../../service/trackService";
import { TrackLoader } from "../../components/Loaders/Loaders";

const NewReleases = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const { isPlaying, currentTrack, ChangePlaylistAndTrack } =
    useContext(PlayerContext);

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    try {
      const { data } = await trackService.getTracks();
      setTracks(data?.data.slice(0, 5));
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <SiteLayout>
        <main style={{ padding: "16px", marginBottom: "6rem" }}>
          <section className="trending">
            <div className="sec-title">
              <h4>Popular new releases</h4>
            </div>
            <div className="items">
              {tracks.length === 0 && <TrackLoader count={8} />}
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
        </main>
      </SiteLayout>
    </React.Fragment>
  );
};

export default NewReleases;
