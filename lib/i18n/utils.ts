import type { Language } from "./en";

export const languageOptions: Array<{ value: Language; label: string }> = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "es", label: "Español" },
  { value: "ja", label: "日本語" },
];

function normalizeLanguageTag(value: string | null | undefined): Language | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase().split("-")[0];

  if (normalized === "en" || normalized === "ko" || normalized === "es" || normalized === "ja") {
    return normalized;
  }

  return null;
}

export function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const detected = normalizeLanguageTag(candidate);

    if (detected) {
      return detected;
    }
  }

  return "en";
}

export function parseStoredLanguage(value: string | null): Language | null {
  return normalizeLanguageTag(value);
}
