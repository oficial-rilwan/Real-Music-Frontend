import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FIREBASE_CONFIG } from "../config/config";

const app = initializeApp(FIREBASE_CONFIG);
export const storage = getStorage(app);
export { app };
