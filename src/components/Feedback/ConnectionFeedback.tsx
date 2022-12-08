import React from "react";
import styles from "./styles/styles.module.css";
import PermScanWifiOutlinedIcon from "@mui/icons-material/PermScanWifiOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

const ConnectionFeedback = () => {
  return (
    <div className={styles.connection}>
      <div>
        <PermScanWifiOutlinedIcon /> There is no internet connection.
      </div>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
};

export default ConnectionFeedback;
