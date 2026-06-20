import { AxiosInstance } from "axios";

export function setupInterceptors(client: AxiosInstance): void {
  // ─── Response Interceptor ──────────────────
  client.interceptors.response.use(
    // ✅ الطلب نجح (200 - 299)
    (response) => {
      return response;
    },

    (error) => {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "حدث خطأ غير متوقع";

      // switch (status) {
      //   // 401 - مش مسجل دخول أو التوكن انتهى
      //   case 401:
      //     if (status === 401 && typeof window !== "undefined") {
      //       localStorage.removeItem("khareej-completed-lessons");
      //       const currentPath = window.location.pathname;
      //       if (!currentPath.includes("/login")) {
      //         window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
      //       }
      //       return Promise.reject({ ...error, message });
      //     }
      //     break;

      //   // 404 - المورد مش موجود
      //   case 404:
      //     if (status === 404 && typeof window !== "undefined") {
      //       window.location.href = "/error";
      //     }
      //     break;

      //   // 500 - خطأ في السيرفر
      //   case 500:
      //     if (typeof window !== "undefined") {
      //       window.location.href = "/error";
      //     }
      //     break;

      //   // 501 - السيرفر واقف
      //   case 501:
      //     if (typeof window !== "undefined") {
      //       window.location.href = "/maintenance";
      //     }
      //     break;

      //   // 501 - السيرفر واقف
      //   case 503:
      //     if (status === 503) {
      //       console.error("[api] Backend unavailable:", message);
      //       // ما نوجّهش تلقائياً، نترك الـ component يعرض رسالة مناسبة
      //       return Promise.reject({
      //         ...error,
      //         message: "الخدمة غير متاحة حالياً. حاول مرة أخرى لاحقاً.",
      //       });
      //     }

      //     return Promise.reject({ ...error, message });
      // }

      return Promise.reject({ ...error, message });
    },
  );
}
