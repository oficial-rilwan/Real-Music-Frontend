import { Link } from "react-router-dom";
import React from "react";
import Album from "../../interface/Album";

interface TrackProps {
  album: Album;
}
const AlbumCard = ({ album }: TrackProps) => {
  return (
    <div className="box">
      <img src={album?.albumCover} />
      <div className="content">
        <p>
          <Link to={`/album/${album?._id}`}>{album?.name}</Link>
        </p>
        <small>
          <Link to={`/artists/${album?.artiste?._id}`}>
            <span>{album?.artiste?.name}</span>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default AlbumCard;
