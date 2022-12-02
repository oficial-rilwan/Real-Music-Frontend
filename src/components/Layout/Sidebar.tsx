import React, { useContext } from "react";
import AddHomeOutlinedIcon from "@mui/icons-material/Home";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SpatialAudioOutlinedIcon from "@mui/icons-material/SpatialAudioOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <Logo />
      <div className="sidebar-links">
        <Link to="/">
          <span className={pathname == "/" ? "link active-link" : "link"}>
            <AddHomeOutlinedIcon className="icon" /> <span>Home</span>
          </span>
        </Link>
        <Link to="/trending">
          <span
            className={
              pathname.includes("trending") ? "link active-link" : "link"
            }
          >
            <WhatshotOutlinedIcon className="icon" />
            <span>Trends</span>
          </span>
        </Link>
        {user && (
          <Link to="/library">
            <span
              className={
                pathname.includes("library") ? "link active-link" : "link"
              }
            >
              <LibraryMusicOutlinedIcon className="icon" />
              <span>Library</span>
            </span>
          </Link>
        )}
      </div>
      {user && (
        <div className="sidebar-links">
          <p className="title">Your Collection</p>
          <Link to="/liked-songs">
            <span
              className={
                pathname.includes("liked-songs") ? "link active-link" : "link"
              }
            >
              <FavoriteBorderOutlinedIcon className="icon" />
              <span>Liked Songs</span>
            </span>
          </Link>
          <Link to="/favorite-artists">
            <span
              className={
                pathname.includes("favorite-artists")
                  ? "link active-link"
                  : "link"
              }
            >
              <SpatialAudioOutlinedIcon className="icon" />
              <span>Favorite Artists</span>
            </span>
          </Link>
          <Link to="/playlist">
            <span
              className={
                pathname.includes("playlist") ? "link active-link" : "link"
              }
            >
              <QueueMusicOutlinedIcon className="icon" />
              <span>Playlist</span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
