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
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PlayerContext } from "../../context/PlayerContext";
import styles from "./styles/styles.module.css";
import PlaylistDialog from "../Dialogs/PlaylistDialog";
import ActionMenu from "../Menu";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import { Link } from "react-router-dom";

interface AlbumListProps {
  styles: any;
  refresh: boolean;
}

const AlbumList = ({ styles, refresh }: AlbumListProps) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums();
  }, [refresh]);

  async function getAlbums() {
    try {
      const { data } = await albumService.getAlbums();
      setAlbums(data?.data);
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
        Albums
      </h4>
      <React.Fragment>
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table>
            <TableBody>
              {albums?.map((item: Album, index: number) => (
                <TableRow
                  key={index}
                  style={{ background: index % 2 === 0 ? "#f1f1f1" : "" }}
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
                      <img src={item?.albumCover} alt={item?.name} />
                      <span className={styles.heading}>
                        <span>
                          <Link to={`/albums/${item?._id}`}>{item?.name}</Link>
                        </span>
                        <span>
                          <Link to={`/artists/${item?.artiste?._id}`}>
                            {item?.artiste?.name}
                          </Link>
                        </span>
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

export default AlbumList;
