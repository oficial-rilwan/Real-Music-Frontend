import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 600, height: "100%" }}>
        <img
          style={{ width: "100%" }}
          src="/assets/page-not-found.svg"
          alt="404 Not Found"
        />
      </div>
    </div>
  );
};

export default NotFound;
