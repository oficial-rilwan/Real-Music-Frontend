import React from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../../../components/Layout/SiteLayout";
import styles from "../styles/styles.module.css";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

interface AccountLayoutProps {
  children: JSX.Element;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <SiteLayout>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <ul>
            <li className={styles.profile_pic_info}>
              <Avatar className={styles.user_avatar} />
            </li>
            <Divider />
            <li>
              <Link to="/account/overview">
                <AccountBoxOutlinedIcon className={styles.icon} />
                <span>Account overview</span>
              </Link>
            </li>
            <li>
              <Link to="/account/edit">
                <EditOutlinedIcon className={styles.icon} />
                <span>Edit profile</span>
              </Link>
            </li>
            <li>
              <Link to="/account/change-password">
                <LockOutlinedIcon className={styles.icon} />
                <span>Change Password</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </SiteLayout>
  );
};

export default AccountLayout;
