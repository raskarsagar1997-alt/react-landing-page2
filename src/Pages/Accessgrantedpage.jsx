import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  PlayCircle,
  MessageCircle,
  Send,
  Mail,
  Phone,
  ShieldCheck,
  Ticket,
  Copy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ============================================================================
// हा page "Get Access" बटण दाबल्यानंतर दाखवायचा आहे — payment confirm झाल्यावरची
// "सगळं एकत्र" screen: order confirmation + course access + community links.
// खालच्या `data` object मधून सगळा मजकूर सहज बदलता येतो (checkout page सारखंच पॅटर्न).
// ============================================================================

const data = {
  orderId: "IND-84213",
  name: "Rohan Patil",
  email: "rohan.patil@example.com",
  amount: "999",
  date: "2 जुलै 2026",

  courseName: "मराठी लेखन मास्टरक्लास",
  moduleCount: 12,

  community: {
    whatsapp: "#",
    telegram: "#",
  },

  support: {
    email: "support@example.com",
    phone: "+91 98765 43210",
  },
};

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

function useConfetti() {
  const [burst, setBurst] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 1600);
    return () => clearTimeout(t);
  }, []);
  return burst;
}

function Confetti() {
  const pieces = Array.from({ length: 24 });
  const colors = [c.marigold, c.green, c.gold, c.red, c.navyLight];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const dur = 1.1 + Math.random() * 0.8;
        const size = 6 + Math.random() * 6;
        const color = colors[i % colors.length];
        const rotate = Math.random() * 360;
        return (
          <span
            key={i}
            className="confetti-piece absolute top-0"
            style={{
              left: `${left}%`,
              width: size,
              height: size * 0.4,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px dashed ${c.line}` }}>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.muted }}>{label}</p>
        <p className="text-sm font-semibold" style={{ color: c.navy }}>{value}</p>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md"
        style={{ backgroundColor: c.paper, color: c.marigoldDark, border: `1px solid ${c.line}` }}
      >
        <Copy size={12} /> {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function AccessGrantedPage() {
  const burst = useConfetti();

  return (
    <div
      style={{ backgroundColor: c.paper, color: c.ink, fontFamily: "'Inter', sans-serif" }}
      className="w-full min-h-screen pb-16 relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(340px) rotate(340deg); opacity: 0; }
        }
        .confetti-piece {
          border-radius: 2px;
          animation-name: confettiFall;
          animation-timing-function: ease-in;
          animation-fill-mode: forwards;
        }
        @keyframes popIn {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); }
        }
        .pop-in { animation: popIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .cta-btn {
          position: relative;
          overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.marigold} 0%, ${c.red} 100%);
          box-shadow: 0 8px 20px rgba(192,57,43,0.32), 0 6px 0 rgba(0,0,0,0.15);
          font-family: 'Baloo 2', sans-serif;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 26px rgba(192,57,43,0.42), 0 6px 0 rgba(0,0,0,0.15); }
        .cta-btn:active { transform: translateY(0); }
        .ticket-notch {
          position: absolute;
          width: 22px; height: 22px;
          background: ${c.paper};
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
        }
        .social-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .social-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* Top success banner */}
      <div className="relative w-full px-5 sm:px-10 md:px-16 pt-10 pb-8 text-center overflow-hidden">
        {burst && <Confetti />}
        <div
          className="pop-in mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#DCF3DE" }}
        >
          <CheckCircle2 size={34} style={{ color: c.green }} />
        </div>
        <h1 className="headline text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2" style={{ color: c.navy }}>
          पेमेंट यशस्वी झालं!{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${c.marigold}, ${c.red})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            तुमचा access तयार आहे
          </span>
        </h1>
        <p className="text-sm sm:text-base font-medium max-w-xl mx-auto" style={{ color: c.navyLight }}>
          खाली दिलेल्या स्टेप्स फॉलो करा आणि लगेच सुरुवात करा — तुमची order details email वर पाठवली आहेत.
        </p>
      </div>

      <div className="px-5 sm:px-10 md:px-16 max-w-3xl mx-auto flex flex-col gap-5">
        {/* Order confirmation - ticket stub style */}
        <div
          className="rounded-xl relative"
          style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
        >
          <div className="flex items-center gap-2 px-5 sm:px-6 pt-5">
            <Ticket size={16} style={{ color: c.marigoldDark }} />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: c.muted }}>
              Order Confirmation
            </p>
          </div>
          <div className="px-5 sm:px-6 pb-2 pt-3">
            <CopyRow label="Order ID" value={data.orderId} />
            <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px dashed ${c.line}` }}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.muted }}>Name</p>
                <p className="text-sm font-semibold" style={{ color: c.navy }}>{data.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.muted }}>Date</p>
                <p className="text-sm font-semibold" style={{ color: c.navy }}>{data.date}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px dashed ${c.line}` }}>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.muted }}>Email</p>
                <p className="text-sm font-semibold break-all" style={{ color: c.navy }}>{data.email}</p>
              </div>
            </div>
          </div>
          <div
            className="mx-5 sm:mx-6 my-4 rounded-lg p-4 flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${c.navy}, ${c.navyLight})` }}
          >
            <p className="text-sm font-semibold" style={{ color: c.cream }}>Amount Paid</p>
            <p className="headline text-xl font-extrabold" style={{ color: c.gold }}>
              <span className="text-xs font-semibold align-top mr-0.5">INR</span>{data.amount}
            </p>
          </div>
          <div className="ticket-notch" style={{ left: -11 }} />
          <div className="ticket-notch" style={{ right: -11 }} />
        </div>

        {/* Course access */}
        <div className="rounded-xl p-5 sm:p-6" style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}>
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle size={18} style={{ color: c.marigoldDark }} />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: c.muted }}>Your Course Access</p>
          </div>
          <p className="text-lg font-bold mb-1" style={{ color: c.navy }}>{data.courseName}</p>
          <p className="text-sm mb-4" style={{ color: c.muted }}>
            एकूण {data.moduleCount} modules अनलॉक झाले आहेत. Login details तुमच्या email वर पाठवल्या आहेत.
          </p>
          <button className="cta-btn w-full inline-flex items-center justify-center gap-2 rounded-md font-semibold px-6 py-3.5">
            <PlayCircle size={18} />
            माझा कोर्स सुरू करा
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Community */}
        <div className="rounded-xl p-5 sm:p-6" style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} style={{ color: c.marigoldDark }} />
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: c.muted }}>Community मध्ये सामील व्हा</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={data.community.whatsapp}
              className="social-btn flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold"
              style={{ backgroundColor: "#25D366", color: c.cream }}
            >
              <MessageCircle size={18} /> WhatsApp Group
            </a>
            <a
              href={data.community.telegram}
              className="social-btn flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold"
              style={{ backgroundColor: "#2AABEE", color: c.cream }}
            >
              <Send size={18} /> Telegram Channel
            </a>
          </div>
        </div>

        {/* Next steps */}
        <div className="rounded-xl p-5 sm:p-6" style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: c.navy }}>पुढे काय करायचं</p>
          <div className="flex flex-col gap-4">
            {[
              { n: "1", t: "Email तपासा", d: "Login details आणि receipt तुमच्या inbox मध्ये पाठवली आहे." },
              { n: "2", t: "Community join करा", d: "वरील WhatsApp / Telegram लिंकवरून group मध्ये सामील व्हा." },
              { n: "3", t: "पहिला module सुरू करा", d: "\"माझा कोर्स सुरू करा\" बटणावरून थेट सुरुवात करा." },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-3">
                <div
                  className="headline w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0"
                  style={{ backgroundColor: c.navy, color: c.gold }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: c.navy }}>{s.t}</p>
                  <p className="text-xs" style={{ color: c.muted }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div
          className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: c.navy }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: c.cream }}>काही मदत हवी आहे?</p>
            <p className="text-xs mt-0.5" style={{ color: "#C9D2E3" }}>आमची टीम तुमच्यासाठी उपलब्ध आहे.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${data.support.email}`}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md"
              style={{ backgroundColor: c.navyLight, color: c.cream }}
            >
              <Mail size={14} /> Email
            </a>
            <a
              href={`tel:${data.support.phone}`}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md"
              style={{ backgroundColor: c.navyLight, color: c.cream }}
            >
              <Phone size={14} /> Call
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-1 text-xs" style={{ color: c.muted }}>
          <ShieldCheck size={14} style={{ color: c.green }} />
          तुमचं payment सुरक्षित आणि verified आहे.
        </div>
      </div>
    </div>
  );
}