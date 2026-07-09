import axios from "axios";
import { setupInterceptors } from "./interceptors";

const apiClient = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

setupInterceptors(apiClient);
export default apiClient;
