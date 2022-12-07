import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

const Overview = () => {
  const { user } = useContext(AuthContext);
  return (
    <AccountLayout>
      <div className={styles.section}>
        <h3 className={styles.section_title}>Account overview</h3>
        <h5 className={styles.section_sub_title}>Profile</h5>
        <ul className={styles.user_info}>
          <li>
            <span>Username</span>
            <span>{user?.name}</span>
          </li>
          <li>
            <span>Email</span>
            <span>{user?.email}</span>
          </li>
          <li>
            <span>Date of birth</span>
            <span>{moment(user?.dateOfBirth).format("MMM D, YYYY")}</span>
          </li>
          <li>
            <span>Country of region</span>
            <span>{user?.country}</span>
          </li>
        </ul>
        <Link to="/account/edit" className={styles.edit_btn}>
          Edit profile
        </Link>
      </div>
    </AccountLayout>
  );
};

export default Overview;
