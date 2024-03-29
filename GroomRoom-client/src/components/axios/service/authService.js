import { Axios } from "../axiosCofing";

export const authService = {
  async login(data) {
    return Axios.post("/auth/login", data);
  },

  async registration(data) {
    return Axios.post("/auth/registration", data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async logout() {
    return Axios.post("/auth/logout");
  },
};
