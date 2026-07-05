import axios from "axios";

// ============================================================================
// api.js
// ----------------------------------------------------------------------------
// baseURL आता environment variable मधून येतो, त्यामुळे local आणि production
// साठी वेगळे URL ठेवता येतात — code मध्ये कुठेही बदल करावा लागत नाही.
//
// .env (local development) मध्ये टाका:
//   VITE_API_URL=https://localhost:7158/api
//
// .env.production (live server) मध्ये टाका:
//   VITE_API_URL=https://your-live-domain.com/api
//
// (Vite प्रोजेक्ट असल्यामुळे import.meta.env वापरलं आहे. Create-React-App
// वापरत असाल तर process.env.REACT_APP_API_URL आणि .env मध्ये
// REACT_APP_API_URL=... असं लिहा.)
// ============================================================================

const baseURL = import.meta.env.VITE_API_URL || "https://localhost:7088/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;