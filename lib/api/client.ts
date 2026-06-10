import axios from "axios";
import { setupInterceptors } from "./interceptors";

// instance مخصص من axios بدل ما استخدم axios مباشرة.
// عشان أوحد الإعدادات (base URL + headers + interceptors) بكل المشروع.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default apiClient;
