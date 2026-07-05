// ============================================================================
// razorpayLoader.js
// ----------------------------------------------------------------------------
// Razorpay चा checkout.js script dynamically load करतो. index.html मध्ये
// script tag टाकायची गरज नाही — हा एकदाच load करतो आणि पुन्हा पुन्हा
// call केला तरी already-loaded script पुन्हा load करत नाही.
// ============================================================================

let razorpayScriptPromise = null;

export function loadRazorpayScript() {
  // Script आधीच load झालेला असेल तर लगेच resolve कर
  if (window.Razorpay) return Promise.resolve(true);

  // आधीच loading सुरू असेल (उदा. वापरकर्त्याने पटापट दोनदा click केलं)
  // तर तीच promise परत दे — दोनदा script टाकू नये
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      razorpayScriptPromise = null; // पुढच्या वेळी परत try करता यावं
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}