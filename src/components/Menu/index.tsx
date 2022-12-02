import React, { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import userService from "../../service/userService";
import { AuthContext } from "../../context/AuthContext";
import Track from "../../interface/Track";
import playlistService from "../../service/playlistService";
import Playlist from "../../interface/Playlist";
import { PlayerContext } from "../../context/PlayerContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface MenuProps {
  item: Track | null;
  anchorEl: any;
  handleClose: () => void;
}
const ActionMenu = ({ item, anchorEl, handleClose }: MenuProps) => {
  const { user, refreshDetails } = useContext(AuthContext);
  const {
    handlePlaylistDialog,
    isPlaying,
    currentTrack,
    ChangePlaylistAndTrack,
    pauseCurrentTrack,
  } = useContext(PlayerContext);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getPlaylists();
  }, [refresh]);

  async function likeSong() {
    try {
      await userService.likeSong(item?._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function unlikeSong() {
    try {
      await userService.unlikeSong(item?._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function getPlaylists() {
    try {
      const { data } = await playlistService.getPlaylists();
      setPlaylists(data);
    } catch (ex) {}
  }

  async function addTrackToPlaylist(id: string) {
    try {
      await playlistService.addTrackToPlaylist(id, item?._id);
      setRefresh((prev) => !prev);
      handleClose();
    } catch (ex) {}
  }

  async function removeTrackFromPlaylist(id: string) {
    try {
      await playlistService.removeTrackFromPlaylist(id, item?._id);
      setRefresh((prev) => !prev);
      handleClose();
    } catch (ex) {}
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="song-menu"
      open={Boolean(anchorEl)}
      onClose={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          item && ChangePlaylistAndTrack([item], 0);
          handleClose();
        }}
        className="menuItem"
      >
        <ListItemIcon>
          {isPlaying && currentTrack?._id === item?._id ? (
            <PauseIcon className="icon" />
          ) : (
            <PlayArrowIcon className="icon" />
          )}
        </ListItemIcon>
        {isPlaying && currentTrack?._id === item?._id
          ? "Pause Song"
          : "Play Song"}
      </MenuItem>
      <Divider />
      {item?._id && user?.likes?.includes(item?._id) ? (
        <MenuItem onClick={unlikeSong} className="menuItem">
          <ListItemIcon>
            <ThumbUpIcon className="icon" />
          </ListItemIcon>
          Remove from Liked Songs
        </MenuItem>
      ) : (
        <MenuItem onClick={likeSong} className="menuItem">
          <ListItemIcon>
            <ThumbUpOutlinedIcon className="icon" />
          </ListItemIcon>
          Save to your Liked Songs
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handlePlaylistDialog} className="menuItem">
        <ListItemIcon>
          <AddOutlinedIcon className="icon" />
        </ListItemIcon>
        New Playlist
      </MenuItem>
      {playlists.map((playlist: Playlist) => {
        const trackIds: any = playlist?.tracks?.map((item) => item?._id);
        return (
          <MenuItem
            onClick={() => {
              trackIds.includes(item?._id)
                ? removeTrackFromPlaylist(playlist?._id)
                : addTrackToPlaylist(playlist?._id);
            }}
            className="menuItem"
            key={playlist?._id}
          >
            <ListItemIcon>
              <PlaylistAddCheckIcon className="icon" />
            </ListItemIcon>
            {trackIds.includes(item?._id)
              ? `Remove from "${playlist?.name}"`
              : `Add to "${playlist?.name}"`}
          </MenuItem>
        );
      })}

      {/* <Divider /> */}
      {/* <MenuItem className="menuItem">
        <ListItemIcon>
          <EditIcon className="icon" />
        </ListItemIcon>
        Edit
      </MenuItem> */}
      {/* <MenuItem style={{ color: "red" }} className="menuItem">
        <ListItemIcon>
          <DeleteForeverIcon style={{ color: "red" }} className="icon" />
        </ListItemIcon>
        Delete
      </MenuItem> */}
    </Menu>
  );
};

export default ActionMenu;
