export const PHONE_PATTERN = /^\+?\d{7,15}$/;

export function normalizePhone(raw: string) {
  return raw.replace(/[\s\-()]/g, "");
}

export function isValidPhone(raw: string) {
  return PHONE_PATTERN.test(normalizePhone(raw));
}
