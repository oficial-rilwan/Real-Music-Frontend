import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import authService from "./authService";
import { app } from "./firebaseService";

const ls: Storage | null = typeof window !== "undefined" ? localStorage : null;

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function googleAuthentication() {
  isRequestingAuth("true");
  signInWithRedirect(auth, provider);
}

async function signinUser(
  data: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setLoading(true);
    const res: any = await authService.googleAuth(data);
    ls?.setItem("x-auth-token", res.headers["x-auth-token"]);
    window.location.replace("/");
  } catch (ex) {
    setLoading(false);
  }
}

function isRequestingAuth(request = "false") {
  if (request === "true") ls?.setItem("isGoogleAuthProvider", request);
  return ls?.getItem("isGoogleAuthProvider") || request;
}

function getGoogleAuthCredentials(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  getRedirectResult(auth)
    .then((result: any) => {
      // const credential: any = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      signinUser(user, setLoading);
    })
    .catch((error) => {
      setLoading(false);
      //   const errorCode = error.code;
      // const errorMessage = error?.message;
      // const email = error?.customData?.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export { googleAuthentication, getGoogleAuthCredentials, isRequestingAuth };
