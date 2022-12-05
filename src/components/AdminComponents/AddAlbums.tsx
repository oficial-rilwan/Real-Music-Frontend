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
import fileUploadService from "../../service/fileUploadService";
import artisteService from "../../service/artisteService";
import trackService from "../../service/trackService";
import albumService from "../../service/albumService";
import Album from "../../interface/Album";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CreateTrackDto {
  name: string;
  artiste: string;
  releaseDate: Date;
  albumCover: File | null;
}

interface CreateTrackProps {
  styles: any;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function clearField(callback: any) {
  callback({
    name: "",
    releaseDate: new Date(),
    albumCover: null,
    artiste: "",
  });
}

const AddAlbum = ({ styles, setRefresh }: CreateTrackProps) => {
  const [artists, setArtists] = useState<Artiste[]>([]);
  const [loading, setLoading] = useState(false);
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const [values, setValues] = useState<CreateTrackDto>({
    name: "",
    releaseDate: new Date(),
    albumCover: null,
    artiste: "",
  });

  const formData = {
    ...values,
    albumCover: albumCoverUrl,
  };

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    if (!albumCoverUrl) return;
    save();
  }, [albumCoverUrl]);

  async function getArtists() {
    try {
      const { data } = await artisteService.getArtists();
      setArtists(data?.data);
    } catch (ex) {}
  }

  function uploadFiles(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      fileUploadService.uploadImage(values.albumCover, setAlbumCoverUrl);
    } catch (ex) {
      setLoading(false);
    }
  }

  async function save() {
    try {
      await albumService.create(formData);
      setLoading(false);
      clearField(setValues);
      setRefresh((prev: any) => !prev);
    } catch (ex) {
      setLoading(false);
    }
  }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFile(e: any) {
    const file = e.target.files[0];
    setValues((prev) => ({ ...prev, albumCover: file }));
  }
  return (
    <form className={styles.form} onSubmit={uploadFiles}>
      <div className={styles.formTitle}>Add new album</div>
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
      <label className={styles.label}>Release Date</label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={values.releaseDate}
          className={styles.inputField}
          onChange={(newValue) => {
            setValues((prev: any) => ({ ...prev, releaseDate: newValue }));
          }}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </LocalizationProvider>

      <label className={styles.label}>Poster | Album Cover</label>
      <input className={styles.customInput} onChange={handleFile} type="file" />
      <label className={styles.label}>Artiste</label>
      <Autocomplete
        freeSolo
        size="small"
        className={styles.inputField}
        options={artists}
        getOptionLabel={(option: any) => option?.name}
        onChange={(event, value: any) =>
          setValues((prev) => ({ ...prev, artiste: value._id }))
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

      <button type="submit" className={styles.saveBtn}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddAlbum;
