import Track from "../../interface/Track";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

interface TrackProps {
  item: Track;
  tracks: Track[];
  index: number;
  isPlaying: boolean;
  currentTrack: Track | null;
  ChangePlaylistAndTrack: (tracks: Track[], index: number) => void;
}
const TrackCard = ({
  item,
  tracks,
  index,
  isPlaying,
  currentTrack,
  ChangePlaylistAndTrack,
}: TrackProps) => {
  return (
    <div className="box">
      <img src={item?.poster} />
      <div className="content">
        <p>{item.name}</p>
        <small>
          <Link to={`/artists/${item?.artiste?._id}`}>{item.artiste.name}</Link>
        </small>
      </div>

      <button
        onClick={() => ChangePlaylistAndTrack(tracks, index)}
        className="card-play-btn"
      >
        {isPlaying && currentTrack?._id === item?._id ? (
          <PauseRoundedIcon />
        ) : (
          <PlayArrowIcon />
        )}
      </button>
    </div>
  );
};

export default TrackCard;
