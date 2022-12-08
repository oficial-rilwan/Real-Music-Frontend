import React, { useState } from "react";
import styles from "./styles/styles.module.css";
import Track from "../../interface/Track";
import PlaylistDialog from "../Dialogs/PlaylistDialog";

import Row from "./Row";
import ActionMenu from "../Menu";

interface TracksProps {
  tracks: Track[] | undefined;
}

const TrackTable = ({ tracks }: TracksProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleTrackSelect(track: Track) {
    setSelectedTrack(track);
  }
  return (
    <React.Fragment>
      <div className={styles.tracksRow}>
        {tracks?.map((item: Track, index: number) => (
          <Row
            key={item?._id}
            item={item}
            styles={styles}
            tracks={tracks}
            index={index}
            handleClick={handleClick}
            handleTrackSelect={handleTrackSelect}
          />
        ))}
      </div>
      <ActionMenu
        item={selectedTrack}
        tracks={tracks}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <PlaylistDialog refresh={() => setRefresh((prev) => !prev)} />
    </React.Fragment>
  );
};

export default TrackTable;
