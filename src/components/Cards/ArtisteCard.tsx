import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Artiste from "../../interface/Artiste";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import userService from "../../service/userService";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface TrackProps {
  artiste: Artiste;
}
const ArtisteCard = ({ artiste }: TrackProps) => {
  const { user, refreshDetails } = useContext(AuthContext);

  async function followArtiste() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.followArtiste(artiste?._id);
      refreshDetails();
    } catch (ex) {}
  }

  async function unfollowArtiste() {
    if (!user) return window.location.assign("/auth/signin");
    try {
      await userService.unfollowArtiste(artiste?._id);
      refreshDetails();
    } catch (ex) {}
  }

  return (
    <div className="box">
      <Avatar className="img" src={artiste?.image} />
      <div className="content">
        <p>
          <Link to={`/artists/${artiste?._id}`}>{artiste?.name}</Link>
        </p>
        <small>Artist</small>
      </div>
    </div>
  );
};

export default ArtisteCard;
