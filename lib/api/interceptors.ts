import { AxiosInstance } from "axios";

/**
 * يستخرج رسالة خطأ واضحة من استجابة الـ backend.
 *
 * المشكلة اللي كانت موجود: الـ backend أحياناً يرجع `{ message: null }` حتى لو فيه
 * خطأ فعلي، فكان الـ interceptor يقع في fallback "حدث خطأ غير متوقع" بدون ما
 * يورّيك السبب الحقيقي.
 *
 * الحل: نجرّب عدة مصادر للرسالة بالترتيب:
 *  1. error.response.data.message (الرسالة الواضحة من الـ backend)
 *  2. error.response.data.errors (أحياناً تكون string بدل object)
 *  3. error.response.data.error (بعض الـ backends بترجع الحقل ده)
 *  4. error.response.data.code (الكود بتاع الخطأ زي BACKEND_URL_NOT_SET)
 *  5. error.response.statusText (زي "Internal Server Error")
 *  6. error.message (رسالة axios زي "Request failed with status code 500")
 *  7. fallback عربي
 *
 * كمان بنضيف الـ status code والـ url في الـ console.error عشان الديباج.
 */
function extractErrorMessage(error: unknown): string {
  const err = error as {
    response?: {
      status?: number;
      statusText?: string;
      config?: { url?: string };
      data?: {
        message?: string | null;
        errors?: unknown;
        error?: string | null;
        code?: string;
      };
    };
    message?: string;
  };

  const resp = err?.response;
  const data = resp?.data;

  // 1) رسالة واضحة من الـ backend
  if (
    data?.message &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  // 2) errors كـ string (مش object)
  if (typeof data?.errors === "string" && data.errors.trim()) {
    return data.errors;
  }

  // 3) error field
  if (data?.error && typeof data.error === "string" && data.error.trim()) {
    return data.error;
  }

  // 4) كود الخطأ (مفيد جداً للأخطاء اللي بيرجعها الـ proxy زي BACKEND_URL_NOT_SET)
  if (data?.code) {
    const statusPart = resp?.status ? ` (HTTP ${resp.status})` : "";
    return `${data.code}${statusPart}`;
  }

  // 5) statusText من HTTP (زي "Internal Server Error", "Bad Gateway")
  if (resp?.statusText && resp.statusText.trim()) {
    return `${resp.statusText} (HTTP ${resp?.status})`;
  }

  // 6) رسالة axios الأصلية (زي "Request failed with status code 500")
  if (err?.message && typeof err.message === "string" && err.message.trim()) {
    return err.message;
  }

  return "حدث خطأ غير متوقع";
}

export function setupInterceptors(client: AxiosInstance): void {
  // ─── Response Interceptor ──────────────────
  client.interceptors.response.use(
    // ✅ الطلب نجح (200 - 299)
    (response) => {
      return response;
    },

    (error) => {
      const status = error?.response?.status;
      const url =
        error?.response?.config?.url || error?.config?.url || "(unknown url)";
      const message = extractErrorMessage(error);

      // لوج مفصل في الـ console عشان الديباج
      // نشيل الـ request data عشان ما نطبعش كلمات سر في الـ console
      console.error("[api] ❌ Request failed:", {
        url,
        status,
        message,
        backendData: error?.response?.data ?? null,
      });

      // 401 - مش مسجل دخول أو التوكن انتهى
      // نرجّع المستخدم لصفحة الـ login مع حفظ المسار الأصلي + role المناسب
      if (status === 401 && typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (!currentPath.includes("/login")) {
          // حدد الـ role بناءً على المسار الحالي عشان نرجّع المستخدم
          // لصفحة login بنفس الـ role (مش دايماً student)
          let role = "student";
          if (currentPath.includes("/mentor")) role = "mentor";
          else if (currentPath.includes("/admin")) role = "admin";

          const params = new URLSearchParams({
            redirect: currentPath,
            role,
          });
          window.location.href = `/login?${params.toString()}`;
        }
      }

      return Promise.reject({ ...error, message });
    },
  );
}
