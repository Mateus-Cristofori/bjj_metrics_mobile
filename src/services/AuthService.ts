import fetch from "./api";

class AuthService {
  async login(email: string, password: string) {
    const { data } = await fetch.post("/auth/login", {
      email,
      password,
    });

    return data;
  }
}

export default new AuthService();
