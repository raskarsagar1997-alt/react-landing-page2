import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  BookOpen,
  Gift,
  Lock,
  ShieldCheck,
  User,
  Mail,
  Phone,
} from "lucide-react";

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

const offerItems = [
  {
    title: "1500+ Daily Use English Sentences",
    sub: "25 Lessons • Grammar + Vocabulary + Conversation",
    price: "₹999",
    free: false,
  },
  {
    title: "1000+ Daily Use English Verbs",
    sub: "रोज वापरायचे Essential Verbs • Examples",
    price: "₹299",
    free: false,
  },
  {
    title: "25 Structured Practice Lessons",
    sub: "Beginner ते Confident — Step-by-step",
    price: "₹299",
    free: false,
  },
  {
    title: "Real Life Topics Practice",
    sub: "Office • Travel • Daily Conversations",
    price: "₹499",
    free: true,
  },
];

function useCountdown(initial = 300) {
  const [seconds, setSeconds] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s <= 0 ? initial : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [initial]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return { mm, ss };
}

function FieldInput({ icon: Icon, label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label
        className="block text-xs font-bold uppercase tracking-wide mb-1.5"
        style={{ color: c.navy }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2.5 rounded-lg px-3.5 py-3 border transition-colors"
        style={{ backgroundColor: c.cream, borderColor: c.line }}
      >
        <Icon size={16} style={{ color: c.marigoldDark }} />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
          style={{ color: c.ink }}
        />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { mm, ss } = useCountdown(300);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("razorpay");
  const claimed = 73;
  const total = 100;
  const totalValue = 2096;
  const finalPrice = 199;

  return (
    <div
      style={{
        backgroundColor: c.paper,
        color: c.ink,
        fontFamily: "'Inter', sans-serif",
      }}
      className="w-full min-h-screen pb-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .cta-btn {
          position: relative;
          overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.marigold} 0%, ${c.red} 100%);
          box-shadow: 0 8px 20px rgba(192,57,43,0.32), 0 6px 0 rgba(0,0,0,0.15);
          font-family: 'Baloo 2', sans-serif;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 26px rgba(192,57,43,0.42), 0 6px 0 rgba(0,0,0,0.15);
        }
        .cta-btn:active { transform: translateY(0); }
        .cta-btn::after {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 35%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shine 3.4s ease-in-out infinite;
        }
        @keyframes shine {
          0% { left: -60%; }
          45% { left: 130%; }
          100% { left: 130%; }
        }
        .radio-card {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .radio-card.active {
          border-color: ${c.marigold} !important;
          box-shadow: 0 0 0 3px rgba(232,135,30,0.12);
        }
        .progress-stripes {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.18),
            rgba(255,255,255,0.18) 10px,
            transparent 10px,
            transparent 20px
          );
        }
        input:focus { outline: none; }
      `}</style>

      {/* Progress bar */}
      <div className="w-full h-2" style={{ backgroundColor: c.line }}>
        <div
          className="h-full progress-stripes"
          style={{ width: "80%", backgroundColor: c.green }}
        />
      </div>

      <div className="px-5 sm:px-10 md:px-16 pt-8 pb-6 max-w-5xl mx-auto text-center">
        <h1
          className="headline text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          style={{ color: c.navy }}
        >
          थांबा! तुम्ही{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${c.marigold}, ${c.red})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            1500+ English Sentences
          </span>{" "}
          मिळवण्यापासून एकच Step दूर आहात
        </h1>
        <p className="text-sm sm:text-base font-medium max-w-2xl mx-auto" style={{ color: c.navyLight }}>
          Grammar rules पाठ करण्याची गरज नाही. खाली Details भरा आणि आत्ताच Lifetime Access
          मिळवा — फक्त ₹199 मध्ये.
        </p>
      </div>

      <div className="px-5 sm:px-10 md:px-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Form + Payment */}
        <div>
          <div
            className="rounded-xl p-5 sm:p-6 mb-5"
            style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
          >
            <FieldInput
              icon={User}
              label="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="तुमचं नाव टाका"
            />
            <FieldInput
              icon={Mail}
              label="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <FieldInput
              icon={Phone}
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Order Item */}
          <div
            className="rounded-xl p-5 sm:p-6 mb-5"
            style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: c.muted }}>
                Item
              </p>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: c.muted }}>
                Price
              </p>
            </div>
            <div
              className="radio-card active rounded-lg p-4 flex items-center justify-between border-2 mb-3"
              style={{ borderColor: c.marigold, backgroundColor: "#FBE7CE30" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ border: `5px solid ${c.navy}` }}
                />
                <div>
                  <p className="text-sm font-bold" style={{ color: c.navy }}>One Time Fee</p>
                  <p className="text-xs" style={{ color: c.muted }}>One-time payment</p>
                </div>
              </div>
              <p className="text-lg font-extrabold" style={{ color: c.navy }}>
                <span className="text-xs font-semibold align-top mr-0.5">INR</span>199
              </p>
            </div>

            <div className="flex items-center justify-between py-2" style={{ borderTop: `1px dashed ${c.line}` }}>
              <p className="text-sm" style={{ color: c.muted }}>Pallavi English Classes</p>
              <p className="text-sm font-semibold" style={{ color: c.navy }}>INR 199</p>
            </div>
            <div
              className="flex items-center justify-between pt-3 mt-2"
              style={{ borderTop: `1px solid ${c.line}` }}
            >
              <p className="text-sm font-bold uppercase tracking-wide" style={{ color: c.navy }}>Total</p>
              <p className="headline text-xl font-extrabold" style={{ color: c.marigoldDark }}>
                <span className="text-xs font-semibold align-top mr-0.5">INR</span>199.00
              </p>
            </div>
          </div>

          {/* Payment method */}
          <div
            className="rounded-xl p-5 sm:p-6"
            style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: c.navy }}>
              Pay Via
            </p>
            <div className="flex items-center gap-6 mb-4">
              {["razorpay", "cashfree"].map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={payMethod === m}
                    onChange={() => setPayMethod(m)}
                    className="accent-current"
                    style={{ accentColor: c.marigold }}
                  />
                  <span className="text-sm font-semibold capitalize" style={{ color: c.navy }}>
                    {m}
                  </span>
                </label>
              ))}
            </div>

            <div
              className="rounded-lg py-6 flex flex-col items-center justify-center gap-1 mb-4"
              style={{ border: `1px solid ${c.marigold}`, backgroundColor: "#FDF6EC" }}
            >
              <p className="text-xs font-medium" style={{ color: c.marigoldDark }}>
                Completing payment with
              </p>
              <p className="headline text-lg font-extrabold" style={{ color: "#3B5AA6" }}>
                Razorpay
              </p>
            </div>

            <button className="w-full rounded-lg font-bold py-3.5 text-sm sm:text-base"
              style={{ backgroundColor: c.green, color: c.cream }}
            >
              Complete Order
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs mt-3" style={{ color: c.muted }}>
              <Lock size={12} /> 100% Secure Payment
            </p>
          </div>
        </div>

        {/* RIGHT: Offer summary */}
        <div>
          <div
            className="rounded-xl p-4 flex items-center gap-2.5 mb-5"
            style={{ backgroundColor: c.navy }}
          >
            <Gift size={20} style={{ color: c.gold }} />
            <div>
              <p className="font-bold text-sm" style={{ color: c.cream }}>
                आज तुम्हाला हे सगळं मिळतय
              </p>
              <p className="text-xs" style={{ color: "#C9D2E3" }}>
                एकदाच Pay करा — Lifetime Access मिळेल
              </p>
            </div>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
          >
            {offerItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 px-5 py-4"
                style={{ borderBottom: `1px solid ${c.line}` }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color: c.green }} />
                  <div>
                    <p className="text-sm font-semibold flex items-center gap-2 flex-wrap" style={{ color: c.navy }}>
                      {item.title}
                      {item.free && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ backgroundColor: "#DCF3DE", color: c.green }}
                        >
                          FREE
                        </span>
                      )}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: c.muted }}>{item.sub}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold shrink-0" style={{ color: item.free ? c.green : c.marigoldDark }}>
                  {item.price}
                </p>
              </div>
            ))}

            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm font-semibold" style={{ color: c.navy }}>Total Combined Value</p>
              <p className="text-sm font-semibold line-through" style={{ color: c.red }}>
                ₹{totalValue.toLocaleString("en-IN")}
              </p>
            </div>

            <div
              className="mx-5 mb-5 rounded-lg p-4 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${c.navy}, ${c.navyLight})` }}
            >
              <div>
                <p className="font-bold text-sm sm:text-base" style={{ color: c.cream }}>आज तुम्ही Pay करा</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#C9D2E3" }}>
                  One-time • Lifetime Access • No Subscription
                </p>
              </div>
              <p className="headline text-2xl sm:text-3xl font-extrabold" style={{ color: c.gold }}>
                ₹{finalPrice}
              </p>
            </div>

            <div className="mx-5 mb-6">
              <p className="text-xs font-semibold mb-2 text-center" style={{ color: c.green }}>
                {claimed} / {total} Copies Claimed — फक्त {total - claimed} Slots शिल्लक
              </p>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: c.line }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${claimed}%`, background: `linear-gradient(90deg, ${c.green}, #56A87B)` }}
                />
              </div>
            </div>

            <div className="px-5 pb-6">
              <button className="cta-btn w-full inline-flex items-center justify-center gap-2 rounded-md font-semibold px-6 py-3.5">
                <BookOpen size={18} />
                GET ACCESS NOW
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs" style={{ color: c.muted }}>
            <ShieldCheck size={14} style={{ color: c.green }} />
            Secure Checkout • Instant Email Delivery
          </div>
        </div>
      </div>

      {/* Sticky bottom timer bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-center gap-3"
        style={{
          background: `linear-gradient(135deg, ${c.red}, ${c.marigoldDark})`,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p className="text-xs sm:text-sm font-semibold hidden sm:block" style={{ color: c.cream }}>
          Offer संपायला बाकी:
        </p>
        <div className="flex items-center gap-1.5">
          {["00", mm, ss].map((v, i) => (
            <div
              key={i}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: c.cream, color: c.red }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}