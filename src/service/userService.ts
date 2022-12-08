import httpService from "./httpService";

class UserService {
  getToken() {
    const ls: Storage | null = localStorage || null;
    const defaultToken: any = ls?.getItem("x-auth-token") || null;
    return defaultToken;
  }

  getUser() {
    return httpService.get("/user");
  }
  updateUser(data: any) {
    return httpService.put("/user", data);
  }
  changePassword(data: any) {
    const { confirmNewPassword, ...rest } = data;
    return httpService.put("/user/change-password", rest);
  }
  followArtiste(artisteId: any) {
    return httpService.put("/user/follow", { artisteId });
  }
  unfollowArtiste(artisteId: any) {
    return httpService.put("/user/unfollow", { artisteId });
  }
  likeSong(trackId: any) {
    return httpService.put("/user/like", { trackId });
  }
  unlikeSong(trackId: any) {
    return httpService.put("/user/unlike", { trackId });
  }
  getLikedSongs() {
    return httpService.get("/user/favorites");
  }
  getRecentlyPlayed() {
    return httpService.get("/user/recently-played");
  }
  addToRecentlyPlayed(trackId: string) {
    return httpService.put("/user/recently-played", { trackId });
  }
  getFollowings() {
    return httpService.get("/user/followings");
  }
}

export default new UserService();
