import httpService from "./httpService";

class ArtisteService {
  getArtists() {
    return httpService.get("/artiste");
  }
  getOneArtiste(id: string | string[] | undefined) {
    return httpService.get("/artiste/" + id);
  }
  create(data: any) {
    return httpService.post("/artiste", data);
  }
  search(query: string | string[] | undefined) {
    return httpService.get("/artiste/search?name=" + query);
  }
}

export default new ArtisteService();
