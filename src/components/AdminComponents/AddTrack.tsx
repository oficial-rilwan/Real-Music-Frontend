import Search from "@mui/icons-material/Search";
import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Artiste from "../../interface/Artiste";
import Genre from "../../interface/Genre";
import genreService from "../../service/genreService";
import fileUploadService from "../../service/fileUploadService";
import artisteService from "../../service/artisteService";
import trackService from "../../service/trackService";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";

interface CreateTrackDto {
  name: string;
  artiste: string;
  poster: File | null;
  track: File | null;
  genre: string[];
  album?: string;
}

interface CreateTrackProps {
  styles: any;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function clearField(callback: any) {
  callback({
    name: "",
    artiste: "",
    track: null,
    poster: null,
    genre: [],
    album: "",
  });
}

const AddTrack = ({ styles, setRefresh }: CreateTrackProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artists, setArtists] = useState<Artiste[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [trackUrl, setTrackUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [values, setValues] = useState<CreateTrackDto>({
    name: "",
    artiste: "",
    track: null,
    poster: null,
    genre: [],
    album: "",
  });

  const formData = {
    ...values,
    url: trackUrl,
    poster: posterUrl,
  };

  useEffect(() => {
    getGenres();
    getArtists();
  }, []);

  useEffect(() => {
    if (!values.artiste) return;
    getArtisteAlbums();
  }, [values.artiste]);

  useEffect(() => {
    if (!trackUrl || !posterUrl) return;
    save();
  }, [trackUrl, posterUrl]);

  async function getGenres() {
    try {
      const { data } = await genreService.getGenres();
      setGenres(data);
    } catch (ex) {}
  }

  async function getArtists() {
    try {
      const { data } = await artisteService.getArtists();
      setArtists(data?.data);
    } catch (ex) {}
  }

  async function getArtisteAlbums() {
    try {
      setLoadingAlbums(true);
      const { data } = await albumService.getArtisteAlbums(values.artiste);
      setAlbums(data);
      setLoadingAlbums(false);
    } catch (ex) {
      setLoadingAlbums(false);
    }
  }

  function uploadFiles(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (trackUrl && posterUrl) return;
      setLoading(true);
      fileUploadService.uploadTrack(values.track, setTrackUrl);
      fileUploadService.uploadImage(values.poster, setPosterUrl);
    } catch (ex) {
      setLoading(false);
    }
  }

  async function save() {
    try {
      await trackService.create(formData);
      setLoading(false);
      setRefresh((prev: any) => !prev);
      clearField(setValues);
      setPosterUrl("");
      setTrackUrl("");
    } catch (ex) {
      setLoading(false);
    }
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFile(e: any, type: string) {
    const file = e.target.files[0];
    switch (type) {
      case "track":
        setValues((prev) => ({ ...prev, track: file }));
        break;
      case "poster":
        setValues((prev) => ({ ...prev, poster: file }));
        break;
      default:
    }
  }
  return (
    <form className={styles.form} onSubmit={uploadFiles}>
      <div className={styles.formTitle}>Add new track</div>
      <label className={styles.label}>Name</label>
      <TextField
        fullWidth
        required
        name="name"
        size="small"
        value={values.name}
        onChange={handleInputChange}
        className={styles.inputField}
      />
      <label className={styles.label}>Track</label>
      <input
        required
        className={styles.customInput}
        onChange={(e) => handleFile(e, "track")}
        type="file"
        accept=".mp3"
      />
      <label className={styles.label}>Poster | Track image</label>
      <input
        className={styles.customInput}
        onChange={(e) => handleFile(e, "poster")}
        type="file"
      />
      <label className={styles.label}>Artiste</label>
      <Autocomplete
        freeSolo
        size="small"
        className={styles.inputField}
        options={artists}
        getOptionLabel={(option: any) => option?.name}
        onChange={(event, value: any) =>
          setValues((prev) => ({ ...prev, artiste: value?._id }))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            required={!values.artiste}
            placeholder="Artiste"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <label className={styles.label}>Album</label>
      <Select
        fullWidth
        name="album"
        size="small"
        displayEmpty
        value={values.album}
        className={styles.inputField}
        onChange={handleInputChange}
      >
        {albums.map((item) => (
          <MenuItem key={item._id} value={item?._id}>
            {item?.name}
          </MenuItem>
        ))}
        {loadingAlbums && <MenuItem value="">Loading Albums...</MenuItem>}
        {!loadingAlbums && albums.length === 0 && (
          <MenuItem value="no albums">No Albums Found</MenuItem>
        )}
      </Select>
      <label className={styles.label}>Genre</label>
      <Autocomplete
        multiple
        size="small"
        id="tags-standard"
        options={genres}
        className={styles.inputField}
        getOptionLabel={(option: any) => option.name}
        onChange={(event, value: any) =>
          setValues((prev) => ({
            ...prev,
            genre: value?.map((item: any) => item._id),
          }))
        }
        renderInput={(params) => <TextField {...params} placeholder="Genres" />}
      />

      <button type="submit" className={styles.saveBtn}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddTrack;
