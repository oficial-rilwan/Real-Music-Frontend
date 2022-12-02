import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseService";

class uploadFiles {
  uploadTrack(file: File | null, setTrackUrl: any) {
    if (!file) return;
    const fileName = `${file.name}${Date.now()}`;
    const storageRef = ref(storage, `/musicFiles/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setTrackUrl(url);
      }
    );
  }
  uploadImage(file: File | null, setImageUrl: any) {
    if (!file) return;
    const fileName = `${file.name}${Date.now()}`;
    const storageRef = ref(storage, `/imageFiles/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(url);
      }
    );
  }
}

export default new uploadFiles();
