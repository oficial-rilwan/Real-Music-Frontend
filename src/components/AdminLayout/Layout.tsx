import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import Header from "../Layout/Header";
import Player from "../Player/Player";
import Sidebar from "./Sidebar";
interface LayoutChildren {
  children: JSX.Element;
}
const Layout = ({ children }: LayoutChildren) => {
  const { currentTrack } = useContext(PlayerContext);
  return (
    <div className="site-layout">
      <Sidebar />
      <div className={currentTrack ? "screen-height-active" : "screen-height"}>
        <Header />
        {children}
      </div>
      {currentTrack && <Player />}
    </div>
  );
};

export default Layout;
