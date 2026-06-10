import { AxiosInstance } from "axios";

export function setupInterceptors(client: AxiosInstance): void {
  // ─── Response Interceptor ──────────────────
  client.interceptors.response.use(
    // ✅ الطلب نجح (200 - 299)
    (response) => {
      const status = response.status;
      return response;
    },

    // ❌ الطلب فشل
    (error) => {
      const status = error.response?.status;

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "حدث خطأ غير متوقع";

      switch (status) {
        // 401 - مش مسجل دخول أو التوكن انتهى
        case 401:
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;

        // 404 - المورد مش موجود
        case 404:
          if (typeof window !== "undefined") {
            window.location.href = "/error";
          }
          break;

        // 500 - خطأ في السيرفر
        case 500:
          if (typeof window !== "undefined") {
            window.location.href = "/error";
          }
          break;

        // 501 - السيرفر واقف
        case 501:
          if (typeof window !== "undefined") {
            window.location.href = "/maintenance";
          }
          break;
      }

      return Promise.reject({ ...error, message });
    },
  );
}
