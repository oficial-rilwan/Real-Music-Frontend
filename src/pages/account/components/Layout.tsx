import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SiteLayout from "../../../components/Layout/SiteLayout";
import styles from "../styles/styles.module.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Header from "../../../components/Layout/Header";
import { PlayerContext } from "../../../context/PlayerContext";

interface AccountLayoutProps {
  children: JSX.Element;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  const { pathname } = useLocation();
  const { currentTrack } = useContext(PlayerContext);
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <ul>
          <li className={styles.profile_pic_info}>
            <AccountCircleOutlinedIcon className={styles.user_avatar} />
          </li>
          <li>
            <Link
              to="/account/overview"
              className={
                pathname.includes("overview") ? styles.active_link : ""
              }
            >
              <AccountBoxOutlinedIcon className={styles.icon} />
              <span>Account overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/account/edit"
              className={pathname.includes("edit") ? styles.active_link : ""}
            >
              <EditOutlinedIcon className={styles.icon} />
              <span>Edit profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/account/change-password"
              className={
                pathname.includes("change-password") ? styles.active_link : ""
              }
            >
              <LockOutlinedIcon className={styles.icon} />
              <span>Change password</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={currentTrack ? "screen-height-active" : "screen-height"}>
        <Header />
        <div style={{ marginBottom: "7rem" }}>{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
