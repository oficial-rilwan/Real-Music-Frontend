import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/auth/signin";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";
import { PlayerContext, PlayerContextProvider } from "./context/PlayerContext";
import SignUp from "./pages/auth/signup";
import Home from "./pages/home";
import Albums from "./pages/album";
import SingleAlbum from "./pages/album/SingleAlbum";
import Artists from "./pages/artists";
import SingleArtiste from "./pages/artists/SingleArtiste";
import FavoriteArtists from "./pages/favorite-artists";
import Library from "./pages/library";
import LikedSongs from "./pages/liked-songs";
import NewReleases from "./pages/new-releases";
import SinglePlaylist from "./pages/playlist/SinglePlaylist";
import Playlists from "./pages/playlist";
import RecentlyPlayed from "./pages/recently-played";
import Search from "./pages/search";
import Trending from "./pages/trending";
import Admin from "./pages/admin";
import AdminTrack from "./pages/admin/track/index";
import AdminArtiste from "./pages/admin/artiste";
import AdminAlbum from "./pages/admin/album";
import Overview from "./pages/account";
import EditProfile from "./pages/account/edit";
import ChangePassword from "./pages/account/change_password";
import MobilePlayerPage from "./pages/mobile/player";
import { useContext, useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans - serif"].join(","),
    fontSize: 14,
  },
});
function App() {
  const { currentTrack, isPlaying, currentTrackIndex, playPause, prev, next } =
    useContext(PlayerContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <SignIn />,
    },
    {
      path: "/mobile-player",
      element: <MobilePlayerPage />,
    },
    {
      path: "/album",
      element: <Albums />,
    },
    {
      path: "/trending",
      element: <Trending />,
    },
    {
      path: "/artists",
      element: <Artists />,
    },
    {
      path: "/library",
      element: <Library />,
    },
    {
      path: "/playlist",
      element: <Playlists />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/liked-songs",
      element: <LikedSongs />,
    },
    {
      path: "/new-releases",
      element: <NewReleases />,
    },
    {
      path: "/favorite-artists",
      element: <FavoriteArtists />,
    },
    {
      path: "/recently-played",
      element: <RecentlyPlayed />,
    },
    {
      path: "/artists",
      element: <Artists />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/track",
      element: <AdminTrack />,
    },
    {
      path: "/admin/artiste",
      element: <AdminArtiste />,
    },
    {
      path: "/admin/album",
      element: <AdminAlbum />,
    },

    {
      path: "/account/signup",
      element: <SignUp />,
    },
    {
      path: "/account/overview",
      element: <Overview />,
    },
    {
      path: "/account/edit",
      element: <EditProfile />,
    },
    {
      path: "/account/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/album/:id",
      element: <SingleAlbum />,
    },
    {
      path: "/artists/:id",
      element: <SingleArtiste />,
    },
    {
      path: "/playlist/:id",
      element: <SinglePlaylist />,
    },
  ]);

  useEffect(() => {
    if (!currentTrack || !currentTrack?.url) return;
    window.navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack?.name,
      artist: currentTrack?.artiste?.name,
      artwork: [{ src: currentTrack?.poster }],
    });
    window.navigator.mediaSession.setActionHandler("play", playPause);
    window.navigator.mediaSession.setActionHandler("pause", playPause);
    window.navigator.mediaSession.setActionHandler("seekbackward", prev);
    window.navigator.mediaSession.setActionHandler("seekforward", next);
  }, [currentTrack?.url, isPlaying, currentTrackIndex]);
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <PlayerContextProvider>
          <RouterProvider router={router} />
        </PlayerContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
