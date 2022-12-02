import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "../Player/Player";
import { PlayerContext } from "../../context/PlayerContext";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

interface SiteChildrenProps {
  children: JSX.Element;
}

const SiteLayout = ({ children }: SiteChildrenProps) => {
  const { currentTrack } = useContext(PlayerContext);
  const { loadingUserDetails } = useContext(AuthContext);
  return (
    <React.Fragment>
      <div className="site-layout">
        <Sidebar />
        <div
          className={currentTrack ? "screen-height-active" : "screen-height"}
        >
          <Header />
          {children}
        </div>
        {currentTrack && <Player />}
      </div>
    </React.Fragment>
  );
};

export default SiteLayout;
