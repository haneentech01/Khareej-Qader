import axios from "axios";
import { setupInterceptors } from "./interceptors";

// instance مخصص من axios بدل ما استخدم axios مباشرة.
// عشان أوحد الإعدادات (base URL + headers + interceptors) بكل المشروع.
const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  baseURL: "/api/proxy",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

setupInterceptors(apiClient);
export default apiClient;
