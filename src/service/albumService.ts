import httpService from "./httpService";

class AlbumService {
  getAlbums() {
    return httpService.get("/album");
  }
  getOneAlbum(id: string | string[] | undefined) {
    return httpService.get("/album/" + id);
  }
  getArtisteAlbums(id: string | string[] | undefined) {
    return httpService.get("/album/artiste/" + id);
  }
  create(data: any) {
    return httpService.post("/album", data);
  }
  search(query: string | string[] | undefined) {
    return httpService.get("/album/search?name=" + query);
  }
}

export default new AlbumService();
