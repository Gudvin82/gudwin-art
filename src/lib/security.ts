const SAFE_URL_PROTOCOLS = new Set(["https:", "http:", "blob:", "data:"]);
const ALLOWED_IMAGE_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export function isSafeUrl(url: string): boolean {
  if (!url) return false;

  if (url.startsWith("data:image/")) {
    return true;
  }

  try {
    const parsed = new URL(url, window.location.origin);
    return SAFE_URL_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}

export function sanitizeUrl(url: string): string | null {
  return isSafeUrl(url) ? url : null;
}

export function validateUploadFile(file: File): string | null {
  if (!ALLOWED_IMAGE_MIME.has(file.type)) {
    return "Поддерживаются только JPG, PNG и WEBP.";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "Файл слишком большой. Максимум 10 МБ.";
  }

  return null;
}
