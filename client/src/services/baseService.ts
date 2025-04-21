import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:4200",
  headers: {},
});

export default baseApi;

baseApi.interceptors.request.use(
  (request) => {
    const accessToken =
      JSON.parse(localStorage.getItem("currentUser") || "{}").accessToken || "";
    request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
  },
  (error) => {
    // request.config
    return Promise.reject(error);
  }
);
