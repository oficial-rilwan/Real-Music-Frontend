import AddHomeOutlinedIcon from "@mui/icons-material/Home";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AlbumIcon from "@mui/icons-material/Album";
import GroupIcon from "@mui/icons-material/Group";
import GridViewIcon from "@mui/icons-material/GridView";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidebar">
      <Link to="/">
        <span className="logo-box">
          <EarbudsIcon className="logo" color="primary" />

          <p>
            <span>Real</span>music
          </p>
        </span>
      </Link>
      <div className="sidebar-links">
        <Link to="/">
          <span className={pathname == "/" ? "link active-link" : "link"}>
            <AddHomeOutlinedIcon className="icon" /> <span>Home</span>
          </span>
        </Link>
        <Link to="/admin">
          <span className={pathname == "/admin" ? "link active-link" : "link"}>
            <GridViewIcon className="icon" /> <span>Dashboard</span>
          </span>
        </Link>
        <Link to="/admin/track">
          <span
            className={pathname == "/admin/track" ? "link active-link" : "link"}
          >
            <AudiotrackIcon className="icon" /> <span>Tracks</span>
          </span>
        </Link>
        <Link to="/admin/artiste">
          <span
            className={
              pathname == "/admin/artiste" ? "link active-link" : "link"
            }
          >
            <GroupIcon className="icon" /> <span>Artists</span>
          </span>
        </Link>
        <Link to="/admin/album">
          <span
            className={pathname == "/admin/album" ? "link active-link" : "link"}
          >
            <AlbumIcon className="icon" /> <span>Albums</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
