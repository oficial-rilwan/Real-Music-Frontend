import httpService from "./httpService";

class GenreService {
  getGenres() {
    return httpService.get("/genre");
  }
}

export default new GenreService();
