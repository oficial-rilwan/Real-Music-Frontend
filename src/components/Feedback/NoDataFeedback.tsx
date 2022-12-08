import React from "react";

const NoDataFeedback = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 600,
        display: "flex",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <img
        style={{ maxWidth: 200, width: "100%" }}
        src="/assets/no-data.svg"
        alt="No Data"
      />
    </div>
  );
};

export default NoDataFeedback;
