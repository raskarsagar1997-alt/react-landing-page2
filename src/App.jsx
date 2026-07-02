import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpokenEnglishLanding from "./Pages/Spokenenglishlanding";
import CheckoutPage from "./Pages/Checkoutpage";
import AdminEditor from "./Pages/AdminEditor"
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpokenEnglishLanding />} />
        <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/AdminEditor" element={<AdminEditor />} />

      </Routes>
    </BrowserRouter>
  );
}