import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpokenEnglishLanding from "./Pages/Spokenenglishlanding";
import CheckoutPage from "./Pages/Checkoutpage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpokenEnglishLanding />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}