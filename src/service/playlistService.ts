import httpService from "./httpService";

class PlaylistService {
  create(data: any) {
    return httpService.post("/playlist", data);
  }
  getPlaylists() {
    return httpService.get("/playlist");
  }
  getOnePlaylist(id: string | string[] | undefined) {
    return httpService.get("/playlist/" + id);
  }
  addTrackToPlaylist(id: string, trackId: string | null | undefined) {
    return httpService.put("/playlist/add-track/" + id, { trackId });
  }
  removeTrackFromPlaylist(id: string, trackId: string | null | undefined) {
    return httpService.put("/playlist/remove-track/" + id, { trackId });
  }
}

export default new PlaylistService();
