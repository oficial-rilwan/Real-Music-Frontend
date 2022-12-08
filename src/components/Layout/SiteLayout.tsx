import React, { useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "../Player/Player";
import { PlayerContext } from "../../context/PlayerContext";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import ConnectionFeedback from "../Feedback/ConnectionFeedback";
import useNetworkStatus from "../../hooks/useNetworkStatus";

interface SiteChildrenProps {
  children: JSX.Element;
}

const SiteLayout = ({ children }: SiteChildrenProps) => {
  const { currentTrack } = useContext(PlayerContext);
  const { isConnected } = useNetworkStatus();
  console.log(isConnected);
  return (
    <React.Fragment>
      <div className="site-layout">
        <Sidebar />
        <div
          className={currentTrack ? "screen-height-active" : "screen-height"}
        >
          <Header />
          {!isConnected && <ConnectionFeedback />}
          {children}
        </div>
        {currentTrack && <Player />}
      </div>
    </React.Fragment>
  );
};

export default SiteLayout;
