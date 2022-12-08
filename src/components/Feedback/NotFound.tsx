import React from "react";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <img src="/assets/page-not-found.svg" alt="404 Not Found" />
    </div>
  );
};

export default NotFound;
