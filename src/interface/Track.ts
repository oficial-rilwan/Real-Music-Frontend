import Album from "./Album";
import Artiste from "./Artiste";

export default interface Track {
  _id: string;
  poster: string;
  name: string;
  artiste: Artiste;
  album?: Album;
  url: string;
  likes: string[];
  duration: string;
  likeCount: number;
}
