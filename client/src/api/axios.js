import axios from "axios";
import { redirect } from "react-router-dom";

const baseURL = "http://localhost:8000/api/";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");
        const res = await axios.post(`${baseURL}auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed", refreshError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        redirect("/");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
