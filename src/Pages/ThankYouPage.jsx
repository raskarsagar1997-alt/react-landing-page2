import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Mail,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import defaultContent from "./siteContent";
import { getStoredContent } from "./contentStore";

// ============================================================================
// ThankYouPage.jsx
// ----------------------------------------------------------------------------
// Payment success झाल्यावर CheckoutPage इथे navigate(`/thank-you`, { state }) 
// करून order details पाठवतो. सगळा text siteContent.js मधल्या "thankYouSection"
// मधून येतो.
//
// जर कोणी थेट URL टाकून (state शिवाय) या page वर आलं, तर आधी localStorage मध्ये
// साठवलेली शेवटची order माहिती वापरतो — तीही नसेल तर generic माहिती दाखवतो.
// ============================================================================

const siteContent = getStoredContent(defaultContent);
const { thankYouSection: ty } = siteContent;

const c = {
  paper: "#FBF6EC",
  cream: "#FFFBF2",
  navy: "#1E2A4A",
  navyLight: "#2E3F66",
  marigold: "#E8871E",
  marigoldDark: "#C96C0F",
  red: "#C0392B",
  green: "#3F8361",
  ink: "#2B2B2A",
  muted: "#736C5C",
  line: "#E4DACB",
  gold: "#D6A94A",
};

const LAST_ORDER_KEY = "spoken_english_last_order";

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // 1) Checkout page वरून navigate state मध्ये पाठवलेली माहिती असेल तर तीच वापर
    if (location.state && location.state.orderId) {
      setOrder(location.state);
      try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(location.state));
      } catch (e) {
        // storage उपलब्ध नसेल तर दुर्लक्ष कर
      }
      return;
    }
    // 2) नसेल तर आधीच्या यशस्वी order ची माहिती localStorage मधून घे
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      if (raw) {
        setOrder(JSON.parse(raw));
        return;
      }
    } catch (e) {
      // ignore
    }
    // 3) काहीच नसेल तर generic fallback दाखव
    setOrder({
      orderId: ty.receipt.orderIdSample,
      amount: ty.receipt.amountValue,
      name: "",
      date: new Date().toLocaleDateString("en-IN"),
    });
  }, [location.state]);

  if (!order) return null;

  return (
    <div
      style={{
        backgroundColor: c.paper,
        color: c.ink,
        fontFamily: "'Inter', sans-serif",
      }}
      className="w-full min-h-screen pb-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .download-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(30,42,74,0.15);
        }
      `}</style>

      <div className="px-5 sm:px-10 md:px-16 pt-12 pb-8 max-w-3xl mx-auto text-center">
        <div
          className="pop-in inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
          style={{ backgroundColor: "#DCF3DE" }}
        >
          <CheckCircle2 size={40} style={{ color: c.green }} />
        </div>

        <p
          className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
          style={{ color: c.green, backgroundColor: "#DCF3DE" }}
        >
          {ty.successBadge}
        </p>

        <h1 className="headline text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: c.navy }}>
          {ty.heading}
        </h1>
        <p className="text-sm sm:text-base" style={{ color: c.muted }}>
          {ty.subheading}
        </p>
      </div>

      <div className="px-5 sm:px-10 md:px-16 max-w-3xl mx-auto">
        {/* Receipt */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-6"
          style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: c.navy }}>
            {ty.receipt.label}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase" style={{ color: c.muted }}>
                {ty.receipt.orderIdLabel}
              </p>
              <p className="text-sm font-bold" style={{ color: c.navy }}>{order.orderId}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase" style={{ color: c.muted }}>
                {ty.receipt.amountLabel}
              </p>
              <p className="text-sm font-bold" style={{ color: c.navy }}>{order.amount}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase" style={{ color: c.muted }}>
                {ty.receipt.dateLabel}
              </p>
              <p className="text-sm font-bold" style={{ color: c.navy }}>{order.date}</p>
            </div>
          </div>
          <div
            className="flex items-start gap-2 rounded-lg p-3 text-xs"
            style={{ backgroundColor: "#FDF1D8", color: c.marigoldDark }}
          >
            <Mail size={14} className="mt-0.5 shrink-0" />
            {ty.receipt.emailNote}
          </div>
        </div>

        {/* Downloads */}
        <p className="text-base font-bold mb-3" style={{ color: c.navy }}>
          {ty.downloadsHeading}
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {ty.downloadItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-xl p-4"
              style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: c.navy }}>{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: c.muted }}>{item.sub}</p>
              </div>
              <button
                className="download-btn shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${c.gold}, ${c.marigold})`, color: c.navy }}
              >
                <Download size={14} />
                {item.buttonLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Community */}
        <div
          className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-6"
          style={{ background: `linear-gradient(135deg, ${c.navyLight}, ${c.navy})` }}
        >
          <div className="flex items-start gap-3">
            <MessageCircle size={22} style={{ color: c.gold }} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold" style={{ color: c.cream }}>{ty.community.heading}</p>
              <p className="text-xs mt-1" style={{ color: "#C9D2E3" }}>{ty.community.text}</p>
            </div>
          </div>
          <button
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-lg"
            style={{ backgroundColor: c.green, color: c.cream }}
          >
            {ty.community.buttonLabel}
          </button>
        </div>

        {/* Next steps */}
        <div
          className="rounded-xl p-5 sm:p-6 mb-8"
          style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} style={{ color: c.marigold }} />
            <p className="text-sm font-bold" style={{ color: c.navy }}>{ty.nextSteps.heading}</p>
          </div>
          <div className="flex flex-col gap-3">
            {ty.nextSteps.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: "#FBE7CE", color: c.marigoldDark }}
                >
                  {i + 1}
                </div>
                <p className="text-sm" style={{ color: c.ink }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs mb-1" style={{ color: c.muted }}>{ty.footerNote}</p>
          <p className="text-xs font-semibold mb-6" style={{ color: c.navy }}>{ty.supportEmail}</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg"
            style={{ backgroundColor: c.navy, color: c.cream }}
          >
            <ArrowLeft size={15} />
            {ty.backToHomeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}