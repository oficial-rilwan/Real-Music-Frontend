import Track from "./Track";

export default interface Playlist {
  _id: string;
  name: string;
  description?: string;
  tracks: Track[];
}
