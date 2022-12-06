import React from "react";
import AccountLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

const Overview = () => {
  return (
    <AccountLayout>
      <div className={styles.section}>
        <h3 className={styles.section_title}>Overview</h3>
      </div>
    </AccountLayout>
  );
};

export default Overview;
