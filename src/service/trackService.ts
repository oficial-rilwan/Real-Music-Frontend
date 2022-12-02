import httpService from "./httpService";

class TrackService {
  getTracks() {
    return httpService.get("/track?page=1");
  }
  create(data: any) {
    const { track, ...rest } = data;
    return httpService.post("/track", rest);
  }
  getArtisteTracks(id: string | string[] | undefined) {
    return httpService.get("/track/artiste/" + id);
  }
  getAlbumTracks(id: string | string[] | undefined) {
    return httpService.get("/track/album/" + id);
  }
  getRecentlyPlayed() {
    return httpService.get("/recently-played");
  }
  addToRecentlyPlayed(data: any) {
    return httpService.post("/recently-played", data);
  }
  search(query: string | string[] | undefined) {
    return httpService.get("/track/search?name=" + query);
  }
}

export default new TrackService();
