import React, { useState, useEffect } from "react";
import trackService from "../../service/trackService";
import TrackTableSM from "../TracksTable/TrackTableSM";

interface TrackListProps {
  styles: any;
  refresh: boolean;
}

const TrackList = ({ styles, refresh }: TrackListProps) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks();
  }, [refresh]);

  async function getTracks() {
    try {
      const { data } = await trackService.getTracks();
      setTracks(data?.data);
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <h4
        style={{
          fontSize: "1.5rem",
          marginBottom: "1rem",
          fontWeight: 700,
        }}
      >
        Songs
      </h4>

      <TrackTableSM tracks={tracks} />
    </React.Fragment>
  );
};

export default TrackList;
