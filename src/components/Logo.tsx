import { Link } from "react-router-dom";
import React from "react";
import EarbudsIcon from "@mui/icons-material/Earbuds";

const Logo = () => {
  return (
    <Link to="/">
      <span className="logo-box">
        <EarbudsIcon className="logo" color="primary" />
        <p>
          <span>Real</span>music
        </p>
      </span>
    </Link>
  );
};

export default Logo;
