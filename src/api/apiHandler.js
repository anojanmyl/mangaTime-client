import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUserMangas(mangas) {
    return service
      .patch("/api/users/me/manga", { mangas: mangas })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  transferManga(total) {
    return service
      .patch(`/api/users/manga`, total)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getManga() {
    return service
      .get(`/api/users/me/mangas`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteManga(id) {
    return service
      .patch(`/api/users/dashboard`, { mangaId: id })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUser(id) {
    return service
      .get(`/api/users/dashboard`, { mangaId: id })
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserInfo() {
    return service
      .get("/api/user/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
