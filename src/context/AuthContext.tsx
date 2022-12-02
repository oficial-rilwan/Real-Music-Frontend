import { createContext, useState, useEffect } from "react";
import User from "../interface/User";
import userService from "../service/userService";

const ls: Storage | null = typeof window !== "undefined" ? localStorage : null;

interface AuthToken {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loadingUserDetails: boolean;
  saveToken: (token: string) => void;
  refreshDetails: () => void;
  logoutUser: () => void;
}
interface AuthContextProp {
  children: JSX.Element;
}

export const AuthContext = createContext({} as AuthToken);
const token: string | null = userService.getToken();

export const AuthContextProvider = ({ children }: AuthContextProp) => {
  const [refresh, setRefresh] = useState(false);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) return;
    getUserDetails();
  }, [token, refresh]);

  function saveToken(token: string) {
    ls?.setItem("x-auth-token", token);
  }

  function logoutUser() {
    ls?.clear();
    window.location.replace("/");
  }

  function refreshDetails() {
    setRefresh((prev) => !prev);
  }

  async function getUserDetails() {
    try {
      if (!user) setLoadingUserDetails(true);
      const { data } = await userService.getUser();
      setUser(data);
      setLoadingUserDetails(false);
    } catch (ex) {
      setLoadingUserDetails(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        saveToken,
        logoutUser,
        refreshDetails,
        loadingUserDetails,
        isAuthenticated: token ? true : false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
