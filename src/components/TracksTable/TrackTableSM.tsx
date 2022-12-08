import React, { useState, useContext, useEffect } from "react";
import styles from "./styles/styles.module.css";
import PlaylistDialog from "../Dialogs/PlaylistDialog";
import ActionMenu from "../Menu";
import Track from "../../interface/Track";
import RowSM from "./RowSM";

interface TrackListProps {
  tracks: any;
}

const TrackTableSM = ({ tracks }: TrackListProps) => {
  const [refresh, setRefresh] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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
          <RowSM
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

export default TrackTableSM;
