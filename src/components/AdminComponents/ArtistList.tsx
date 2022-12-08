import artisteService from "../../service/artisteService";
import React, { useState, useContext, useEffect } from "react";
import trackService from "../../service/trackService";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import {
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PlayerContext } from "../../context/PlayerContext";
import styles from "./styles/styles.module.css";
import PlaylistDialog from "../Dialogs/PlaylistDialog";
import ActionMenu from "../Menu";
import { Link } from "react-router-dom";

interface ArtistListProps {
  styles: any;
  refresh: boolean;
}

const ArtistList = ({ styles, refresh }: ArtistListProps) => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists();
  }, [refresh]);

  async function getArtists() {
    try {
      const { data } = await artisteService.getArtists();
      setArtists(data?.data);
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
        Artists
      </h4>
      <React.Fragment>
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table>
            <TableBody>
              {artists?.map((item: any, index: number) => (
                <TableRow
                  style={{ background: index % 2 === 0 ? "#f1f1f1" : "" }}
                  key={index}
                  className={styles.trow}
                >
                  <TableCell
                    style={{ padding: "0 0 0 6px", width: 30 }}
                    className={styles.tcell}
                  >
                    <span className={styles.index}>{index + 1}</span>
                  </TableCell>
                  <TableCell
                    style={{ paddingLeft: 6 }}
                    className={styles.tcell}
                  >
                    <span className={styles.artisteBox}>
                      <Avatar src={item?.image} alt={item?.name} />
                      <span className={styles.heading}>
                        <span>
                          <Link to={`/artists/${item?._id}`}>{item?.name}</Link>
                        </span>
                        <span>Artiste</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell
                    style={{ width: 150 }}
                    align="center"
                    className={styles.tcell}
                  >
                    <span className={styles.actions}>
                      <Tooltip title="Follow this artiste">
                        <IconButton className={styles.icon}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        //   onClick={handleClick}
                        className={styles.icon}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <ActionMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handlePlaylistDialog={() => setPlaylistDialog(true)}
        /> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ArtistList;
