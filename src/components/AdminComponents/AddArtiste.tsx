import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import fileUploadService from "../../service/fileUploadService";
import artisteService from "../../service/artisteService";

interface CreateArtisteDto {
  name: string;
  image: File | null;
}

interface CreateTrackProps {
  styles: any;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function clearField(callback: any) {
  callback({
    name: "",
    image: null,
  });
}

const AddArtiste = ({ styles, setRefresh }: CreateTrackProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [values, setValues] = useState<CreateArtisteDto>({
    name: "",
    image: null,
  });
  console.log(imageUrl);
  //   useEffect(() => {
  //     if (!imageUrl) return;
  //     save();
  //   }, [imageUrl]);

  function uploadFiles(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      fileUploadService.uploadImage(values.image, setImageUrl);
    } catch (ex) {
      setLoading(false);
    }
  }

  //   async function save() {
  //     const { name } = values;
  //     try {
  //       await artisteService.create({ name, image: imageUrl });
  //       setLoading(false);
  //       clearField(setValues);
  //       setRefresh((prev: any) => !prev);
  //     } catch (ex) {
  //       setLoading(false);
  //     }
  //   }

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleFile(e: any) {
    const file = e.target.files[0];
    setValues((prev) => ({ ...prev, image: file }));
  }
  return (
    <form className={styles.form} onSubmit={uploadFiles}>
      <div className={styles.formTitle}>Add new artiste</div>
      <label className={styles.label}>Name</label>
      <TextField
        fullWidth
        name="name"
        size="small"
        required
        value={values.name}
        onChange={handleInputChange}
        className={styles.inputField}
      />
      <label className={styles.label}>Poster | Artiste image</label>
      <input
        required
        className={styles.customInput}
        onChange={handleFile}
        type="file"
      />
      <button type="submit" className={styles.saveBtn}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddArtiste;
