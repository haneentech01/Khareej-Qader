/**
 * Resolves a backend image path to a full URL the browser can load.
 *
 * The backend may return:
 *  - A full URL already: "https://domain.com/storage/photo.jpg"  → returned as-is
 *  - A relative path:    "storage/photo.jpg"  → prepended with BACKEND_BASE
 *  - null / undefined / ""                    → returns the fallback
 */
export function getImageUrl(
  path: string | null | undefined,
  fallback = "/images/default-avatar.svg",
): string {
  if (!path || path.trim() === "") return fallback;

  // Already a full URL
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  // Relative path — prefix with the backend base (without /v1 suffix)
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  // Strip trailing /v1 or /api segment so we reach the storage root
  const base = raw.replace(/\/v\d+$/, "").replace(/\/api$/, "");

  const separator = path.startsWith("/") ? "" : "/";
  return `${base}${separator}${path}`;
}
