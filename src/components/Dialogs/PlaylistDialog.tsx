import { Dialog, Divider, IconButton, TextField } from "@mui/material";
import React, { FormEvent, useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles/styles.module.css";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import playlistService from "../../service/playlistService";
import { PlayerContext } from "../../context/PlayerContext";

interface DialogProps {
  refresh: () => void;
}

interface CreatePlaylistDTO {
  name: string;
  description: string;
}

function clearFields(
  setFormData: React.Dispatch<React.SetStateAction<CreatePlaylistDTO>>
) {
  setFormData({
    name: "",
    description: "",
  });
}

const PlaylistDialog = ({ refresh }: DialogProps) => {
  const { playlistDialog, handlePlaylistDialog } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreatePlaylistDTO>({
    name: "",
    description: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await playlistService.create(formData);
      clearFields(setFormData);
      setLoading(false);
      handlePlaylistDialog();
      refresh();
    } catch (ex) {
      setLoading(false);
    }
  }
  return (
    <Dialog
      classes={{ paper: styles.pdialog }}
      onClose={handlePlaylistDialog}
      open={playlistDialog}
    >
      <div className={styles.pheader}>
        <div className={styles.title}>Add details</div>
        <div>
          <IconButton onClick={handlePlaylistDialog}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Divider />
      <form className={styles.pcontent} onSubmit={save}>
        <div className={styles.grid}>
          <div tabIndex={0} className={styles.gridItem}>
            <PlaylistPlayIcon style={{ fontSize: "5rem" }} />
          </div>
          <div className={styles.gridItem2}>
            <TextField
              placeholder="Add a name"
              className={styles.inputField}
              fullWidth
              size="small"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              placeholder="Add an optional description"
              className={styles.inputField}
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">{loading ? "Saving..." : "Save"}</button>
      </form>
    </Dialog>
  );
};

export default PlaylistDialog;
