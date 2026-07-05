import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpokenEnglishLanding from "./Pages/Spokenenglishlanding";
import CheckoutPage from "./Pages/Checkoutpage";
import AdminEditor from "./Pages/AdminEditor"

import Accessgrantedpage from "./Pages/Accessgrantedpage" 
import Coursedashboard from "./Pages/Coursedashboard"
import Lessonviewer from "./Pages/Lessonviewer"
import ThankYouPage from "./pages/ThankYouPage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpokenEnglishLanding />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/AdminEditor" element={<AdminEditor />} />
        
        <Route path="/Accessgranted" element={<Accessgrantedpage />} />
        <Route path="/Coursedashboard" element={<Coursedashboard />} />
        <Route path="/Lessonviewer" element={<Lessonviewer />} />

<Route path="/thank-you" element={<ThankYouPage />} />


      </Routes>
    </BrowserRouter>
  );
}