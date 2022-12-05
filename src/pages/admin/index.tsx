import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/AdminLayout/Layout";
import { PlayerContext } from "../../context/PlayerContext";
import trackService from "../../service/trackService";
import styles from "./styles/styles.module.css";

const Admin = () => {
  const { isPlaying, currentTrack } = useContext(PlayerContext);

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    try {
      const data = await trackService.getTracks();
      console.log(data);
    } catch (ex) {}
  }
  return (
    <React.Fragment>
      <Layout>
        <div>Dashboard</div>
      </Layout>
    </React.Fragment>
  );
};

export default Admin;
