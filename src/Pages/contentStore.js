
// const STORAGE_KEY = "spoken_english_site_content";

// export function getStoredContent(defaultContent) {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (raw) return JSON.parse(raw);
//   } catch (e) {
//   }
//   return defaultContent;
// }

// ============================================================================
// contentStore.js
// ----------------------------------------------------------------------------
// AdminEditor.jsx मध्ये "Save" दाबल्यावर content localStorage मध्ये save होतो.
// हा helper landing page ला तो saved content वाचायला मदत करतो — साठवलेला
// data नसेल तर siteContent.js मधला default content वापरला जातो.
// ============================================================================

const STORAGE_KEY = "spoken_english_site_content";

export function getStoredContent(defaultContent) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      // महत्त्वाचं: फक्त stored data परत देत नाही — तर defaultContent सोबत
      // merge करतो. यामुळे जर पुढे siteContent.js मध्ये नवीन section
      // (उदा. thankYouSection) add केला, आणि वापरकर्त्याने आधीच जुना
      // content localStorage मध्ये save करून ठेवला असेल, तरी नवीन section
      // "undefined" न येता defaultContent मधून मिळतो.
      return { ...defaultContent, ...stored };
    }
  } catch (e) {
    // JSON corrupt असेल किंवा localStorage उपलब्ध नसेल तर default वापरा
  }
  return defaultContent;
}