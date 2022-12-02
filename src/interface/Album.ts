import Artiste from "./Artiste";

export default interface Album {
  _id?: string;
  name: string;
  albumCover: string;
  artiste: Artiste;
  releaseDate: Date | null;
}
