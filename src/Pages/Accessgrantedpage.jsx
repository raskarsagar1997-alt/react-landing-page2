import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  PlayCircle,
  MessageCircle,
  Send,
  Mail,
  Phone,
  ShieldCheck,
  Copy,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// "Get Access" बटण दाबल्यानंतर / payment confirm झाल्यावर दिसणारी screen.
// CheckoutPage वरून navigate("/access-granted", { state: {...} }) करून खरा
// order data इथे येतो. कोणी थेट URL टाकून आलं (state शिवाय) तर खालचा
// FALLBACK_DATA दाखवला जातो.
//
// DESIGN NOTE: "प्रवेशपत्र" (admission certificate) दिशा — ink-navy पार्श्वभूमीवर
// हाताने शिक्का मारल्यासारखं wax-seal badge, जुन्या certificate सारखी paper
// तिकीट-कार्डे आणि hand-drawn शाई-रेषा dividers. Logic / props / data-flow
// मूळ फाईल प्रमाणेच — फक्त visual layer नवीन आहे.
// ============================================================================

const FALLBACK_DATA = {
  orderId: "IND-84213",
  name: "Rohan Patil",
  email: "rohan.patil@example.com",
  amount: "999",
  date: "2 जुलै 2026",
};

const staticInfo = {
  courseName: "मराठी लेखन मास्टरक्लास",
  moduleCount: 12,
  community: { whatsapp: "#", telegram: "#" },
  support: { email: "support@example.com", phone: "+91 98765 43210" },
};

const c = {
  inkDeep: "#0D1729",
  ink: "#16233F",
  inkLight: "#26375C",
  paper: "#FBF3E0",
  paperEdge: "#E7D6AA",
  rust: "#B4502A",
  rustDark: "#8E3D1E",
  gold: "#CC9A3B",
  goldLight: "#E8C878",
  seal: "#9C2B24",
  green: "#4F7A5D",
  greenSoft: "#E4EFE6",
  brown: "#2E2013",
  muted: "#8D7E63",
  cream: "#F7ECD8",
};

function useCelebration() {
  const [burst, setBurst] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 1700);
    return () => clearTimeout(t);
  }, []);
  return burst;
}

// छोटे कागदी तुकडे / पाकळ्या — शिक्का मारल्यावर उडणाऱ्या कागदाच्या कपट्यांसारखे
function PaperBits() {
  const pieces = Array.from({ length: 22 });
  const palette = [c.gold, c.rust, c.green, c.goldLight];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((_, i) => {
        const left = 6 + Math.random() * 88;
        const delay = Math.random() * 0.4;
        const dur = 1.2 + Math.random() * 0.8;
        const size = 5 + Math.random() * 6;
        const color = palette[i % palette.length];
        const rotate = Math.random() * 360;
        return (
          <span
            key={i}
            className="paper-bit absolute top-0"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 1.6,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              transform: `rotate(${rotate}deg)`,
              borderRadius: "1px 6px 1px 6px",
            }}
          />
        );
      })}
    </div>
  );
}

// चार कोपऱ्यातल्या शाईने काढलेल्या फ्रेम-खुणा — जुन्या प्रमाणपत्रासारखं दिसण्यासाठी
function CornerMarks({ tone = c.gold }) {
  const base = { position: "absolute", width: 16, height: 16, borderColor: tone };
  return (
    <>
      <span style={{ ...base, top: 8, left: 8, borderTop: "2px solid", borderLeft: "2px solid" }} />
      <span style={{ ...base, top: 8, right: 8, borderTop: "2px solid", borderRight: "2px solid" }} />
      <span style={{ ...base, bottom: 8, left: 8, borderBottom: "2px solid", borderLeft: "2px solid" }} />
      <span style={{ ...base, bottom: 8, right: 8, borderBottom: "2px solid", borderRight: "2px solid" }} />
    </>
  );
}

// हाताने काढल्यासारखी नागमोडी शाई-रेषा — विभाग वेगळे करण्यासाठी
function InkDivider() {
  return (
    <svg
      viewBox="0 0 300 12"
      className="w-full h-3 mx-auto opacity-70"
      style={{ maxWidth: 220 }}
      aria-hidden="true"
    >
      <path
        d="M2 6 Q 40 -2, 78 6 T 154 6 T 230 6 T 298 6"
        fill="none"
        stroke={c.gold}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: `1px dashed ${c.paperEdge}` }}
    >
      <div>
        <p className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: c.muted }}>
          {label}
        </p>
        <p className="text-sm font-semibold" style={{ color: c.brown }}>
          {value}
        </p>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="copy-btn flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded"
        style={{ backgroundColor: "transparent", color: c.rust, border: `1.5px solid ${c.rust}` }}
      >
        <Copy size={12} /> {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function AccessGrantedPage() {
  const burst = useCelebration();
  const navigate = useNavigate();
  const location = useLocation();

  // खरा order data असेल तर तो वापर, नसेल तर fallback demo data
  const data = { ...FALLBACK_DATA, ...(location.state || {}), ...staticInfo };

  return (
    <div
      style={{ backgroundColor: c.inkDeep, color: c.cream, fontFamily: "'Hind', sans-serif" }}
      className="w-full min-h-screen pb-16 relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Kalam:wght@400;700&family=Hind:wght@400;500;600;700&display=swap');
        .headline { font-family: 'Yatra One', cursive; letter-spacing: 0.2px; }
        .hand { font-family: 'Kalam', cursive; }

        @keyframes paperFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(320px) rotate(300deg); opacity: 0; }
        }
        .paper-bit { animation-name: paperFall; animation-timing-function: ease-in; animation-fill-mode: forwards; }

        @keyframes sealDrop {
          0% { transform: scale(0.4) rotate(-18deg); opacity: 0; }
          65% { transform: scale(1.12) rotate(-8deg); opacity: 1; }
          100% { transform: scale(1) rotate(-6deg); }
        }
        .seal-drop { animation: sealDrop 0.65s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease both; }

        .cta-btn {
          position: relative; overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.rust} 0%, ${c.seal} 100%);
          box-shadow: 0 8px 18px rgba(156,43,36,0.35), 0 5px 0 rgba(0,0,0,0.18);
          font-family: 'Yatra One', cursive;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 24px rgba(156,43,36,0.45), 0 5px 0 rgba(0,0,0,0.18); }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn::after {
          content: ""; position: absolute; top: 0; left: -60%; width: 30%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg); animation: shine 3.6s ease-in-out infinite;
        }
        @keyframes shine { 0% { left: -60%; } 45% { left: 130%; } 100% { left: 130%; } }

        .ticket-notch { position: absolute; width: 20px; height: 20px; background: ${c.inkDeep}; border-radius: 50%; top: 50%; transform: translateY(-50%); }
        .social-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .social-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 18px rgba(0,0,0,0.25); }
        .copy-btn { transition: transform 0.15s ease, background-color 0.2s ease, color 0.2s ease; }
        .copy-btn:hover { background-color: ${c.rust}; color: ${c.cream}; }
        .hover-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-card:hover { transform: translateY(-3px); box-shadow: 0 16px 30px rgba(0,0,0,0.35); }
        .grain {
          background-image: radial-gradient(rgba(46,32,19,0.05) 1px, transparent 1px);
          background-size: 3px 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .paper-bit, .seal-drop, .fade-up, .cta-btn::after { animation: none !important; }
        }
      `}</style>

      {/* Hero band — शिक्का मारल्याची / प्रमाणपत्र दिल्याची भावना */}
      <div
        className="relative w-full px-5 sm:px-10 md:px-16 pt-12 pb-14 text-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${c.inkDeep} 0%, ${c.ink} 100%)` }}
      >
        {burst && <PaperBits />}

        {/* Wax-seal badge */}
        <div className="seal-drop relative mx-auto mb-5 w-20 h-20 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `2.5px dashed ${c.goldLight}`, opacity: 0.6 }}
          />
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 35% 30%, ${c.rust}, ${c.seal} 75%)`,
              boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
            }}
          >
            <Check size={26} style={{ color: c.cream }} strokeWidth={3} />
          </div>
          {/* ribbon tails */}
          <span
            className="absolute"
            style={{
              bottom: -10, left: "38%",
              width: 0, height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `14px solid ${c.rustDark}`,
              transform: "rotate(-8deg)",
            }}
          />
          <span
            className="absolute"
            style={{
              bottom: -10, right: "38%",
              width: 0, height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `14px solid ${c.seal}`,
              transform: "rotate(8deg)",
            }}
          />
        </div>

        <p className="hand text-sm mb-1" style={{ color: c.goldLight }}>
          पेमेंट यशस्वी झालं
        </p>
        <h1 className="headline text-3xl sm:text-4xl md:text-[2.6rem] leading-tight mb-3" style={{ color: c.cream }}>
          तुमचा <span style={{ color: c.goldLight }}>प्रवेश</span> निश्चित झाला आहे
        </h1>
        <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#C6CFE0" }}>
          खाली दिलेल्या स्टेप्स फॉलो करा आणि लगेच सुरुवात करा — तुमची order details email वर पाठवली आहेत.
        </p>
      </div>

      <div className="px-5 sm:px-10 md:px-16 max-w-3xl mx-auto flex flex-col items-center gap-6 -mt-6">
        {/* Order confirmation — प्रमाणपत्र / तिकीट शैली */}
        <div
          className="fade-up hover-card grain rounded-md relative w-full"
          style={{ backgroundColor: c.paper, border: `1px solid ${c.paperEdge}`, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
        >
          <CornerMarks />
          <div className="px-6 sm:px-8 pt-6 text-center">
            <p className="hand text-xs tracking-wide" style={{ color: c.muted }}>
              — पावती —
            </p>
          </div>
          <div className="px-6 sm:px-8 pb-2 pt-3">
            <CopyRow label="Order ID" value={data.orderId} />
            <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px dashed ${c.paperEdge}` }}>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: c.muted }}>Name</p>
                <p className="text-sm font-semibold" style={{ color: c.brown }}>{data.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: c.muted }}>Date</p>
                <p className="text-sm font-semibold" style={{ color: c.brown }}>{data.date}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px dashed ${c.paperEdge}` }}>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-widest" style={{ color: c.muted }}>Email</p>
                <p className="text-sm font-semibold break-all" style={{ color: c.brown }}>{data.email}</p>
              </div>
            </div>
          </div>
          <div
            className="mx-6 sm:mx-8 my-4 rounded p-4 flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${c.ink}, ${c.inkLight})`, border: `1px solid ${c.gold}` }}
          >
            <p className="hand text-sm" style={{ color: c.cream }}>एकूण भरलेली रक्कम</p>
            <p className="headline text-xl" style={{ color: c.goldLight }}>
              <span className="text-xs align-top mr-1" style={{ fontFamily: "'Hind', sans-serif" }}>INR</span>
              {data.amount}
            </p>
          </div>
          <div className="ticket-notch" style={{ left: -10 }} />
          <div className="ticket-notch" style={{ right: -10 }} />
        </div>

        <InkDivider />

        {/* Course access */}
        <div
          className="fade-up hover-card rounded-md p-6 sm:p-7 w-full"
          style={{ backgroundColor: c.paper, border: `1px solid ${c.paperEdge}`, animationDelay: "0.08s" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: c.ink }}>
              <PlayCircle size={18} style={{ color: c.goldLight }} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: c.muted }}>Your Course Access</p>
          </div>
          <p className="headline text-xl mb-1" style={{ color: c.brown }}>{data.courseName}</p>
          <p className="text-sm mb-5" style={{ color: c.muted }}>
            एकूण {data.moduleCount} modules अनलॉक झाले आहेत. Login details तुमच्या email वर पाठवल्या आहेत.
          </p>
          <button
            onClick={() => navigate("/Coursedashboard")}
            className="cta-btn w-full inline-flex items-center justify-center gap-2 rounded px-6 py-3.5 text-base"
          >
            <PlayCircle size={18} />
            माझा कोर्स सुरू करा
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Community */}
        <div
          className="fade-up hover-card rounded-md p-6 sm:p-7 w-full"
          style={{ backgroundColor: c.paper, border: `1px solid ${c.paperEdge}`, animationDelay: "0.16s" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: c.ink }}>
              <MessageCircle size={16} style={{ color: c.goldLight }} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: c.muted }}>Community मध्ये सामील व्हा</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={data.community.whatsapp}
              className="social-btn flex items-center justify-center gap-2 rounded py-3 text-sm font-bold"
              style={{ backgroundColor: "#25D366", color: "#0D1729" }}
            >
              <MessageCircle size={18} /> WhatsApp Group
            </a>
            <a
              href={data.community.telegram}
              className="social-btn flex items-center justify-center gap-2 rounded py-3 text-sm font-bold"
              style={{ backgroundColor: "#2AABEE", color: "#0D1729" }}
            >
              <Send size={18} /> Telegram Channel
            </a>
          </div>
        </div>

        {/* Next steps */}
        <div
          className="fade-up hover-card rounded-md p-6 sm:p-7 w-full"
          style={{ backgroundColor: c.paper, border: `1px solid ${c.paperEdge}`, animationDelay: "0.24s" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: c.muted }}>पुढे काय करायचं</p>
          <div className="flex flex-col gap-5">
            {[
              { n: "1", t: "Email तपासा", d: "Login details आणि receipt तुमच्या inbox मध्ये पाठवली आहे." },
              { n: "2", t: "Community join करा", d: "वरील WhatsApp / Telegram लिंकवरून group मध्ये सामील व्हा." },
              { n: "3", t: "पहिला module सुरू करा", d: '"माझा कोर्स सुरू करा" बटणावरून थेट सुरुवात करा.' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div
                  className="hand w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: c.ink, color: c.goldLight, border: `1.5px solid ${c.gold}` }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: c.brown }}>{s.t}</p>
                  <p className="text-xs" style={{ color: c.muted }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div
          className="fade-up rounded-md p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
          style={{ backgroundColor: c.ink, border: `1px solid ${c.inkLight}`, animationDelay: "0.32s" }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: c.cream }}>काही मदत हवी आहे?</p>
            <p className="text-xs mt-0.5" style={{ color: "#9FACC6" }}>आमची टीम तुमच्यासाठी उपलब्ध आहे.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${data.support.email}`}
              className="social-btn flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded"
              style={{ backgroundColor: c.inkLight, color: c.cream }}
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={`tel:${data.support.phone}`}
              className="social-btn flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded"
              style={{ backgroundColor: c.inkLight, color: c.cream }}
            >
              <Phone size={14} /> Call
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-1 text-xs" style={{ color: "#9FACC6" }}>
          <ShieldCheck size={14} style={{ color: c.green }} />
          तुमचं payment सुरक्षित आणि verified आहे.
        </div>
      </div>
    </div>
  );
}