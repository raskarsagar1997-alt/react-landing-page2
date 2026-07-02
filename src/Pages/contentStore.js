
const STORAGE_KEY = "spoken_english_site_content";

export function getStoredContent(defaultContent) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
  }
  return defaultContent;
}