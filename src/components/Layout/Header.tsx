import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AddHomeOutlinedIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AlbumIcon from "@mui/icons-material/Album";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../service/userService";

const Header = () => {
  const navigate = useNavigate();
  const { logoutUser, user, token } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate("/search?keyword=" + query);
  }
  return (
    <header style={{ zIndex: 10 }}>
      <nav className="bottom-nav">
        <Link to="/">
          <span className={pathname === "/" ? "item active" : "item"}>
            <AddHomeOutlinedIcon className="icon" />
            <p>Home</p>
          </span>
        </Link>
        {pathname.includes("/admin") ? (
          <React.Fragment>
            <Link to="/admin/track">
              <span
                className={
                  pathname.includes("/admin/track") ? "item active" : "item"
                }
              >
                <AudiotrackIcon className="icon" />
                <p>Tracks</p>
              </span>
            </Link>
            <Link to="/admin/artiste">
              <span
                className={
                  pathname.includes("/admin/artiste") ? "item active" : "item"
                }
              >
                <GroupIcon className="icon" />
                <p>Artists</p>
              </span>
            </Link>
            <Link to="/admin/album">
              <span
                className={
                  pathname.includes("/admin/album") ? "item active" : "item"
                }
              >
                <AlbumIcon className="icon" />
                <p>Albums</p>
              </span>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/search">
              <span
                className={
                  pathname.includes("/search") ? "item active" : "item"
                }
              >
                <SearchIcon className="icon" />
                <p>Search</p>
              </span>
            </Link>
            <Link to="/library">
              <span
                className={
                  pathname.includes("/library") ? "item active" : "item"
                }
              >
                <LibraryMusicOutlinedIcon className="icon" />
                <p>Your Library</p>
              </span>
            </Link>
            <Link to="/playlist">
              <span
                className={
                  pathname.includes("/playlist") ? "item active" : "item"
                }
              >
                <QueueMusicOutlinedIcon className="icon" />
                <p>Playlist</p>
              </span>
            </Link>
          </React.Fragment>
        )}
      </nav>
      <nav className={"nav-bar"}>
        <div className="navigation">
          <KeyboardArrowLeftIcon className="icon" />
          <KeyboardArrowRightIcon className="icon" />
        </div>
        <form onSubmit={handleSearch} tabIndex={0} className="search-bar">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
          />
          <button type="submit">
            <img src="/assets/search-icon.png" alt="" />
          </button>
        </form>

        <div tabIndex={0} onClick={handleClick} className="user">
          {user?.profileImage ? (
            <Avatar
              style={{ width: 30, height: 30 }}
              src={user?.profileImage}
              alt={user?.name}
            />
          ) : (
            <AccountCircleOutlinedIcon className="icon user-icon" />
          )}
          <span>{user?.name}</span>
          {/* <ArrowDropDownIcon className="icon arrow" /> */}
        </div>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {user && (
            <MenuItem>
              <ListItemIcon>
                <LaunchIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
          )}
          {user && (
            <MenuItem>
              <ListItemIcon>
                <LaunchIcon fontSize="small" />
              </ListItemIcon>
              My account
            </MenuItem>
          )}
          {user && (
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          )}

          {user?.isAdmin && (
            <MenuItem>
              <Link to="/admin">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Admin Dashboard
                </span>
              </Link>
            </MenuItem>
          )}
          {user && (
            <MenuItem onClick={logoutUser}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          )}

          {!user && (
            <MenuItem>
              <Link to="/auth">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <LaunchIcon fontSize="small" />
                  </ListItemIcon>
                  Sign in
                </span>
              </Link>
            </MenuItem>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
