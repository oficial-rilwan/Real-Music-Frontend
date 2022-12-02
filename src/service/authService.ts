import CreateUser from "../dto/User";
import httpService from "./httpService";

class AuthService {
  signup(data: CreateUser) {
    const { confirmPassword, ...rest } = data;
    return httpService.post("/user", rest);
  }
  signin(data: CreateUser) {
    return httpService.post("/auth", data);
  }
  googleAuth(data: any) {
    const formData = {
      name: data?.displayName,
      email: data?.email,
    };
    return httpService.post("/auth/google-auth-provider", formData);
  }
}

export default new AuthService();
