import { Link } from "react-router-dom";
import Artiste from "../../interface/Artiste";
import { Avatar } from "@mui/material";

interface TrackProps {
  artiste: Artiste;
}
const ArtisteCard = ({ artiste }: TrackProps) => {
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
