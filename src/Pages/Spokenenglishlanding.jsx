import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle2,
  ChevronDown,
  Smartphone,
  Laptop,
  GraduationCap,
  Zap,
  Infinity as InfinityIcon,
  X,
  BookOpen,
  Volume2,
  TrendingUp,
  Gift,
  Menu,
  ShieldCheck,
  Award,
  ArrowRight,
  Users,
  Sparkles,
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

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const painPoints = [
  "इंग्रजी समजते पण बोलता येत नाही",
  "बोलताना योग्य words आठवत नाहीत",
  "Sentence कसे बनवायचे हे समजत नाही",
  "लोकांसमोर बोलताना भीती वाटते",
];

const accessFeatures = [
  { icon: Smartphone, label: "Mobile Friendly PDF" },
  { icon: Laptop, label: "Laptop / Tablet" },
  { icon: GraduationCap, label: "Self Learning" },
  { icon: Zap, label: "Instant Access" },
  { icon: InfinityIcon, label: "Lifetime Use" },
];

const timeline = [
  {
    tag: "WEEK 1–2",
    text: "Simple English sentences बोलायला लागाल — आत्मविश्वास वाढेल",
  },
  {
    tag: "WEEK 3",
    text: "Conversation करताना confidence वाढेल — भीती कमी होईल",
  },
  {
    tag: "DAY 30",
    text: "Interview व daily life मध्ये English वापरणे natural वाटेल",
  },
];

const testimonials = [
  {
    msg: "Mam, ab main office mein thodi-thodi English bolna start kar diya 😊\nConfidence bahut improve hua 🚀",
    reply: "Great 👍",
  },
  {
    msg: "Main ek housewife hu 😊\nMujhe lagta tha English seekhna mushkil hai\nBut aapne bahut easy bana diya mam ❤️",
    reply: "Very Nice Ma'am keep learning 👍",
  },
  {
    msg: "Honestly mam, maine bahut courses try kiye 😅\nBut aapki LIVE classes sabse alag aur practical lagi 🔥",
    reply: "Thank you very much..👍\nKeep learning..👍",
  },
];

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

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Marathi Medium Friendly",
    text: "प्रत्येक वाक्य Marathi context मध्ये समजावलेलं, त्यामुळे गोंधळ होत नाही.",
  },
  {
    icon: BookOpen,
    title: "1500+ Real Sentences",
    text: "Theory नाही, फक्त रोज वापरता येतील असे ready-to-use sentences.",
  },
  {
    icon: InfinityIcon,
    title: "Lifetime Access",
    text: "एकदा खरेदी करा, आयुष्यभर वापरा — कोणतेही subscription नाही.",
  },
  {
    icon: Award,
    title: "Proven Results",
    text: "हजारो विद्यार्थ्यांनी वापरून आत्मविश्वासाने बोलायला सुरुवात केली.",
  },
];

const faqs = [
  {
    q: "What is included in the Spoken English E-Book Bundle?",
    a: "या bundle मध्ये तुम्हाला 1500+ Daily Use English Sentences, 1000+ रोज वापरायचे English Verbs, 25 Structured Practice Lessons आणि Real Life Topics Practice (Office, Travel, Daily Conversations) मिळतात — सगळं एका PDF bundle मध्ये, एकाच वेळी.",
  },
  {
    q: "Who can benefit from this Spoken English E-Book Bundle?",
    a: "Marathi medium मधून शिकलेले विद्यार्थी, नोकरी करणारे, गृहिणी आणि interview ची तयारी करणारे — ज्यांना इंग्रजी समजते पण बोलताना अडखळतं, त्यांच्यासाठी हे खास बनवलं आहे.",
  },
  {
    q: "Are these E-Books suitable for self-study, or do I need a tutor?",
    a: "हो, हे E-Books पूर्णपणे self-study साठी डिझाईन केले आहेत. प्रत्येक lesson step-by-step आणि सोप्या भाषेत समजावलेला आहे, त्यामुळे वेगळ्या tutor ची गरज नाही.",
  },
  {
    q: "How does the E-Book bundle help in speaking English fluently?",
    a: "Grammar चे अवघड rules शिकवण्याऐवजी, ready-to-use sentences आणि daily practice lessons देऊन तुम्ही रोजच्या परिस्थितीत लगेच इंग्रजी बोलायला सुरुवात करू शकता.",
  },
  {
    q: "What if I have questions after purchasing the bundle?",
    a: "खरेदीनंतर काही शंका असल्यास तुम्ही आमच्याशी WhatsApp किंवा email द्वारे संपर्क करू शकता — आमची टीम मदत करेल.",
  },
  {
    q: "How soon will I get the E-Books after payment?",
    a: "Payment झाल्यावर लगेच E-Books चा access तुमच्या email वर मिळेल — Instant download, वाट पाहावी लागणार नाही.",
  },
  {
    q: "What payment methods do you support?",
    a: "आम्ही UPI, Credit/Debit Card, Net Banking आणि सर्व प्रमुख wallets स्वीकारतो — payment पूर्णपणे secure आहे.",
  },
];

/* ---------- Reusable animated / motion helpers ---------- */

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(26px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 1400 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function CTAButton({ full, small }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/checkout")}
      className={`cta-btn inline-flex items-center justify-center gap-2 rounded-sm font-semibold ${
        small ? "px-4 py-2 text-xs" : "px-7 py-3.5 text-sm sm:text-base"
      } ${full ? "w-full" : ""}`}
    >
      आत्ताच सुरुवात करा — ₹199
      <ArrowRight size={small ? 14 : 17} className="cta-arrow" />
    </button>
  );
}
function Eyebrow({ children }) {
  return (
    <div
      className="inline-block text-xs tracking-widest font-bold uppercase mb-3 px-3 py-1 rounded-full"
      style={{ color: c.marigoldDark, backgroundColor: "#FBE7CE" }}
    >
      {children}
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[70] transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(30,42,74,0.82)" : "rgba(30,42,74,0.42)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "rgba(214,169,74,0.35)" : "rgba(214,169,74,0.08)"}`,
      }}
    >
      <div className="flex items-center justify-between px-5 sm:px-10 md:px-16 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${c.gold}, ${c.marigold})` }}
          >
            <BookOpen size={16} style={{ color: c.navy }} />
          </div>
          <span className="headline font-bold text-sm sm:text-base" style={{ color: c.cream }}>
            Spoken English<span style={{ color: c.gold }}>.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold tracking-wide uppercase nav-link"
              style={{ color: "#D6DCEC" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md text-xs font-bold px-4 py-2 nav-cta"
          >
            <Zap size={13} />
            ₹199 मध्ये मिळवा
          </button>
          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{ color: c.cream }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden flex flex-col px-5 pb-4 gap-3"
          style={{ borderTop: "1px solid rgba(214,169,74,0.2)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold pt-3"
              style={{ color: "#D6DCEC" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function RuledDivider() {
  return (
    <div
      className="w-full h-px my-10"
      style={{
        backgroundImage: `repeating-linear-gradient(to right, ${c.line} 0, ${c.line} 8px, transparent 8px, transparent 16px)`,
      }}
    />
  );
}

export default function SpokenEnglishLanding() {
  const [openFaq, setOpenFaq] = useState(0);
  const [seconds, setSeconds] = useState(600);
  const claimed = 73;
  const total = 100;

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 600 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div
      style={{
        backgroundColor: c.paper,
        color: c.ink,
        fontFamily: "'Inter', sans-serif",
        paddingTop: "56px",
      }}
      className="w-full min-h-screen pb-24"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .notebook-margin { position: relative; }
        .notebook-margin::before {
          content: "";
          position: absolute;
          left: 28px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #E7B9AE;
        }
        @media (max-width: 640px) {
          .notebook-margin::before { left: 14px; }
        }

        /* Nav */
        .nav-link { position: relative; transition: color 0.25s ease; }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          width: 0; height: 2px;
          background: ${c.gold};
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: ${c.cream}; }
        .nav-link:hover::after { width: 100%; }
        .nav-cta {
          background: linear-gradient(135deg, ${c.gold}, ${c.marigold});
          color: ${c.navy};
          box-shadow: 0 4px 14px rgba(214,169,74,0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(214,169,74,0.5); }

        /* Premium gradient CTA button with shine sweep */
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

        /* 3D floating book */
        .book-perspective { perspective: 1400px; }
        .book-3d {
          transform-style: preserve-3d;
          animation: bookFloat 7s ease-in-out infinite;
          transition: transform 0.5s ease;
          will-change: transform;
        }
        .book-3d:hover {
          animation-play-state: paused;
          transform: rotateY(14deg) rotateX(5deg) scale(1.04) translateY(-6px);
        }
        @keyframes bookFloat {
          0%, 100% { transform: rotateY(-7deg) rotateX(2deg) translateY(0px); }
          50% { transform: rotateY(7deg) rotateX(-2deg) translateY(-12px); }
        }
        .book-shadow {
          animation: shadowPulse 7s ease-in-out infinite;
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.35; }
          50% { transform: scaleX(0.82); opacity: 0.2; }
        }

        /* 3D depth icons */
        .icon-3d {
          box-shadow: 0 3px 0 rgba(0,0,0,0.06), 0 10px 18px rgba(30,42,74,0.14), inset 0 1px 0 rgba(255,255,255,0.7);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .icon-3d:hover {
          transform: translateY(-5px) rotateX(12deg);
          box-shadow: 0 6px 0 rgba(0,0,0,0.08), 0 16px 26px rgba(30,42,74,0.2), inset 0 1px 0 rgba(255,255,255,0.7);
        }

        /* Animated / hover cards */
        .hover-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 32px rgba(30,42,74,0.14);
          border-color: ${c.gold} !important;
        }
      `}</style>

      <Navbar />

      {/* Top urgency marquee */}
      <div
        className="w-full text-center py-2.5 px-4 text-xs sm:text-sm font-semibold"
        style={{ backgroundColor: c.navy, color: c.cream }}
      >
        🔴 पहिल्या {total} लोकांसाठीच हा Price — आधीच {claimed} जणांनी खरेदी केले | ऑफर संपण्यापूर्वी घ्या!
      </div>

      {/* HERO */}
      <section id="home" className="px-6 sm:px-10 md:px-16 pt-14 pb-16 w-full text-center">
        <Reveal>
          <Eyebrow>🚨 Limited Time Offer</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            className="headline text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5"
            style={{ color: c.navy }}
          >
            आत्मविश्वासाने इंग्रजी बोलायला सुरुवात करा
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${c.marigold}, ${c.red})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              1500+ Daily Use English Sentences
            </span>
            <span> Ebook for Beginners</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base sm:text-lg mb-2" style={{ color: c.muted }}>
            हा Ebook तुम्हाला step-by-step इंग्रजी बोलायला मदत करेल.
          </p>
          <p className="text-base sm:text-lg mb-8" style={{ color: c.muted }}>
            Grammar चे मोठे rules न शिकता ready sentences वापरून बोलायला सुरुवात करा.
          </p>
        </Reveal>
<br></br>
<hr></hr>
<br></br>
<br></br>
        {/* 3D Animated Book mockup */}
        <Reveal delay={0.15}>
          <div className="book-perspective relative mb-8 mx-auto max-w-3xl">
            <div
              className="book-shadow absolute left-1/2 -translate-x-1/2 bottom-[-14px] w-2/3 h-6 rounded-full"
              style={{ background: "radial-gradient(ellipse at center, rgba(30,42,74,0.35), transparent 70%)" }}
            />
            <div
              className="book-3d relative rounded-2xl p-6 sm:p-10"
              style={{
                background: `linear-gradient(155deg, ${c.navyLight}, ${c.navy} 60%)`,
                boxShadow: "0 24px 50px rgba(15,26,51,0.35)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="hidden sm:flex flex-col gap-4">
                  <div className="rounded-lg p-3 text-left" style={{ backgroundColor: "#28365A" }}>
                    <p className="text-xs font-bold" style={{ color: c.gold }}>REAL-LIFE ENGLISH</p>
                    <p className="text-[11px] mt-1" style={{ color: "#C9D2E3" }}>Home • Office • Travel</p>
                  </div>
                  <div className="rounded-lg p-3 text-left" style={{ backgroundColor: "#28365A" }}>
                    <p className="text-xs font-bold" style={{ color: c.gold }}>25 STRUCTURED LESSONS</p>
                    <p className="text-[11px] mt-1" style={{ color: "#C9D2E3" }}>Step-by-step design</p>
                  </div>
                </div>

                <div
                  className="rounded-xl p-6 flex flex-col items-center justify-center gap-2 mx-auto w-full max-w-[220px]"
                  style={{
                    background: `linear-gradient(160deg, #0F1A33, ${c.navy})`,
                    border: `1px solid ${c.gold}`,
                    boxShadow: `0 0 0 1px rgba(214,169,74,0.15), 0 10px 24px rgba(0,0,0,0.35)`,
                  }}
                >
                  <p className="text-xs font-bold" style={{ color: c.gold }}>1500+</p>
                  <p className="headline text-xl font-extrabold text-center leading-tight" style={{ color: c.cream }}>
                    DAILY USE ENGLISH SENTENCES
                  </p>
                  <div className="w-full h-px my-1" style={{ backgroundColor: "#3A4A70" }} />
                  <p className="text-[11px] font-semibold text-center" style={{ color: c.gold }}>
                    MARATHI MEDIUM
                  </p>
                  <p className="text-[10px] text-center" style={{ color: "#C9D2E3" }}>
                    Beginner Friendly
                  </p>
                </div>

                <div className="hidden sm:flex flex-col gap-4">
                  <div className="rounded-lg p-3 text-left" style={{ backgroundColor: "#28365A" }}>
                    <p className="text-xs font-bold" style={{ color: c.gold }}>EASY SENTENCE STRUCTURE</p>
                    <p className="text-[11px] mt-1" style={{ color: "#C9D2E3" }}>Subject • Verb • Object</p>
                  </div>
                  <div className="rounded-lg p-3 text-left" style={{ backgroundColor: "#28365A" }}>
                    <p className="text-xs font-bold" style={{ color: c.gold }}>BEGINNER FRIENDLY</p>
                    <p className="text-[11px] mt-1" style={{ color: "#C9D2E3" }}>Perfect for Marathi medium</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5" style={{ borderTop: "1px solid #33436B" }}>
                {[
                  { icon: Volume2, label: "Audio Support" },
                  { icon: BookOpen, label: "Daily Use" },
                  { icon: TrendingUp, label: "Improve Skills" },
                  { icon: InfinityIcon, label: "Lifetime Access" },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                    <f.icon size={18} style={{ color: c.gold }} />
                    <p className="text-[10px]" style={{ color: "#C9D2E3" }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <CTAButton />
        </Reveal>
      </section>

      {/* PAIN POINTS + FEATURES */}
      <section id="features" className="px-6 sm:px-10 md:px-16 py-14" style={{ backgroundColor: c.cream }}>
        <div className="w-full">
          <Reveal>
            <h2 className="headline text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: c.navy }}>
              English बोलताना हे होतं का?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {painPoints.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="hover-card rounded-lg p-4 flex items-start gap-2 border h-full"
                  style={{ backgroundColor: c.paper, borderColor: c.line }}
                >
                  <X size={16} className="mt-0.5 shrink-0" style={{ color: c.red }} />
                  <p className="text-sm font-medium">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div
              className="rounded-lg p-5 text-center text-sm sm:text-base font-medium mb-10"
              style={{ backgroundColor: "#FDF1D8", border: `1px solid ${c.gold}`, color: c.navy }}
            >
              तुम्ही एकटे नाही. अनेक लोकांना English समजते — पण बोलायला सुरुवात कशी करायची हे कळत नाही.
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 justify-items-center">
            {accessFeatures.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="icon-3d w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}
                  >
                    <f.icon size={22} style={{ color: c.navy }} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: c.muted }}>{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* PRODUCT STATS */}
      <section className="px-6 sm:px-10 md:px-16 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="book-perspective">
              <div
                className="book-3d rounded-xl aspect-[4/5] max-w-xs mx-auto w-full flex flex-col items-center justify-center gap-2 p-6"
                style={{
                  background: `linear-gradient(160deg, ${c.navyLight}, ${c.navy})`,
                  boxShadow: "0 20px 40px rgba(15,26,51,0.3)",
                }}
              >
                <p className="text-sm font-bold" style={{ color: c.gold }}>1500+</p>
                <p className="headline text-2xl font-extrabold text-center" style={{ color: c.cream }}>
                  Daily Use English Sentences
                </p>
                <div className="w-10 h-px" style={{ backgroundColor: c.gold }} />
                <p className="text-xs font-semibold" style={{ color: "#C9D2E3" }}>Marathi Medium</p>
                <p className="text-xs" style={{ color: "#C9D2E3" }}>Beginner Friendly</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="headline text-2xl sm:text-3xl font-bold mb-2" style={{ color: c.navy }}>
                1500+ Daily Use English Sentences Ebook
              </h2>
              <p className="mb-6" style={{ color: c.muted }}>
                Theory नाही – Practical, Ready-to-Use Sentences
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: 1500, suffix: "+", l: "Daily Sentences" },
                  { n: 25, suffix: "", l: "Structured Lessons" },
                  { n: 3, suffix: "+", l: "Real Life Topics" },
                  { n: null, suffix: "", l: "Beginner Friendly", text: "Easy" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="hover-card rounded-lg p-4 text-center"
                    style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
                  >
                    <p className="headline text-xl font-extrabold" style={{ color: c.marigold }}>
                      {s.n !== null ? <AnimatedCounter target={s.n} suffix={s.suffix} /> : s.text}
                    </p>
                    <p className="text-xs mt-1" style={{ color: c.muted }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="px-6 sm:px-10 md:px-16 py-16" style={{ backgroundColor: c.cream }}>
        <div className="w-full">
          <Reveal>
            <div className="text-center mb-10">
              <Eyebrow>Why Choose Us</Eyebrow>
              <h2 className="headline text-2xl sm:text-3xl font-bold" style={{ color: c.navy }}>
                या Ebook मध्ये असं काय वेगळं आहे?
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyChooseUs.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="hover-card rounded-xl p-5 h-full text-center flex flex-col items-center"
                  style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}
                >
                  <div
                    className="icon-3d w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: `linear-gradient(150deg, ${c.gold}, ${c.marigold})` }}
                  >
                    <w.icon size={26} style={{ color: c.navy }} />
                  </div>
                  <h3 className="headline text-base font-bold mb-2" style={{ color: c.navy }}>
                    {w.title}
                  </h3>
                  <p className="text-xs" style={{ color: c.muted }}>{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-6 sm:px-10 md:px-16 py-16 w-full">
        <div className="w-full">
          <Reveal>
            <h2 className="headline text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: c.navy }}>
              रोज practice केली तर हे होईल
            </h2>
            <p className="text-center mb-10" style={{ color: c.muted }}>
              जर तुम्ही रोज थोडी practice केली तर...
            </p>
          </Reveal>
          <div className="relative">
            <div
              className="hidden sm:block absolute top-6 left-0 right-0 h-0.5"
              style={{
                backgroundImage: `repeating-linear-gradient(to right, ${c.gold} 0, ${c.gold} 8px, transparent 8px, transparent 16px)`,
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {timeline.map((t, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10 font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${c.marigold}, ${c.red})`, color: c.cream }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="hover-card rounded-lg p-5 w-full"
                      style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}
                    >
                      <p className="text-xs font-bold tracking-widest mb-2" style={{ color: c.marigoldDark }}>
                        {t.tag}
                      </p>
                      <p className="text-sm font-medium" style={{ color: c.navy }}>{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 sm:px-10 md:px-16 py-16 w-full">
        <Reveal>
          <Eyebrow>Reviews</Eyebrow>
          <h2 className="headline text-2xl sm:text-3xl font-bold mb-10" style={{ color: c.navy }}>
            See How Our Students Are Transforming Their English
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="hover-card rounded-xl p-4 flex flex-col gap-3 h-full"
                style={{ backgroundColor: "#E9F5EA", border: "1px solid #CDE6CF" }}
              >
                <div className="bg-white rounded-lg p-3 shadow-sm self-start max-w-[92%]">
                  {t.msg.split("\n").map((line, j) => (
                    <p key={j} className="text-sm" style={{ color: c.ink }}>{line}</p>
                  ))}
                </div>
                <div className="rounded-lg p-3 self-end max-w-[85%]" style={{ backgroundColor: "#D2F2CE" }}>
                  {t.reply.split("\n").map((line, j) => (
                    <p key={j} className="text-sm font-medium" style={{ color: c.ink }}>{line}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OFFER BREAKDOWN */}
      <section id="pricing" className="px-6 sm:px-10 md:px-16 py-16" style={{ backgroundColor: c.cream }}>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ background: `linear-gradient(135deg, ${c.gold}, ${c.marigold})`, color: c.navy }}
            >
              Special Launch Offer
            </div>
            <h2 className="headline text-2xl sm:text-3xl font-bold mb-3" style={{ color: c.navy }}>
              Here's Everything You're Getting Today
            </h2>
            <p className="text-sm" style={{ color: c.muted }}>
              Ek baar pay karo - lifetime access. Koi subscription nahi. Koi hidden charges nahi.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="max-w-2xl mx-auto rounded-xl overflow-hidden hover-card"
            style={{ border: `2px solid ${c.marigold}` }}
          >
            <div
              className="p-5 text-center"
              style={{ background: `linear-gradient(135deg, ${c.marigold}, ${c.marigoldDark})` }}
            >
              <p className="headline text-lg sm:text-xl font-extrabold" style={{ color: c.cream }}>
                🎁 YOUR COMPLETE SPOKEN ENGLISH EBOOK
              </p>
              <p className="text-xs mt-1" style={{ color: "#FFF3E1" }}>
                Everything listed below — one-time payment only
              </p>
            </div>

            <div style={{ backgroundColor: c.cream }}>
              {offerItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-5 py-4"
                  style={{ borderBottom: `1px solid ${c.line}` }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color: c.green }} />
                    <div>
                      <p className="text-sm font-semibold flex items-center gap-2" style={{ color: c.navy }}>
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
                  <p className="text-sm font-semibold shrink-0" style={{ color: item.free ? c.green : c.muted }}>
                    {item.price}
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-sm font-semibold" style={{ color: c.navy }}>Total Value</p>
                <p className="text-sm font-semibold line-through" style={{ color: c.red }}>₹2,096</p>
              </div>

              <div
                className="mx-5 mb-5 rounded-lg p-4 flex items-center justify-between"
                style={{ background: `linear-gradient(135deg, ${c.navy}, ${c.navyLight})` }}
              >
                <p className="font-bold text-sm sm:text-base" style={{ color: c.cream }}>You Pay Today</p>
                <p className="headline text-2xl font-extrabold" style={{ color: c.gold }}>
                  ₹199 <span className="text-xs font-semibold align-middle" style={{ color: c.cream }}>ONLY</span>
                </p>
              </div>

              <div className="mx-5 mb-6">
                <p className="text-xs font-semibold mb-2 text-center" style={{ color: c.green }}>
                  {claimed} / {total} Copies Claimed — फक्त {total - claimed} Slots शिल्लक • Price नंतर ₹999 होईल
                </p>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: c.line }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${claimed}%`, background: `linear-gradient(90deg, ${c.green}, #56A87B)` }}
                  />
                </div>
              </div>

              <div className="px-5 pb-6">
                <CTAButton full />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BONUS + LAUNCH OFFER */}
      <section className="px-6 sm:px-10 md:px-16 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div
              className="hover-card rounded-xl p-6 h-full"
              style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Gift size={20} style={{ color: c.marigold }} />
                <h3 className="headline text-lg font-bold" style={{ color: c.navy }}>Special Bonus</h3>
              </div>
              {[
                "1000+ Daily Use English Verbs",
                "25 Structured Practice Lessons",
                "3+ Real Life Topics Practice",
              ].map((b, i) => (
                <div key={i} className="py-3" style={{ borderBottom: i < 2 ? `1px solid ${c.line}` : "none" }}>
                  <p className="text-sm font-semibold" style={{ color: c.navy }}>{b}</p>
                  <p className="text-xs font-bold mt-0.5" style={{ color: c.green }}>FREE BONUS</p>
                </div>
              ))}
              <p className="text-xs font-medium mt-4 mb-2" style={{ color: c.muted }}>
                Slots भरत आहेत... <span style={{ color: c.navy }}>{claimed} / {total} Claimed</span>
              </p>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: c.line }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${claimed}%`, background: `linear-gradient(90deg, ${c.red}, ${c.marigold})` }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="hover-card rounded-xl p-6 text-center h-full"
              style={{ background: `linear-gradient(155deg, ${c.navyLight}, ${c.navy})` }}
            >
              <h3 className="headline text-lg font-bold mb-1" style={{ color: c.cream }}>Special Launch Offer</h3>
              <p className="text-sm line-through mb-1" style={{ color: "#8A96B4" }}>Regular ₹999</p>
              <p className="headline text-4xl font-extrabold mb-4" style={{ color: c.gold }}>₹199</p>
              <div className="text-left inline-block">
                {["1500+ Sentences", "25 Lessons", "Real Life English", "Instant Access", "1000+ Verbs (FREE)"].map(
                  (f, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <CheckCircle2 size={16} style={{ color: c.gold }} />
                      <p className="text-sm" style={{ color: c.cream }}>{f}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center mt-10">
          <CTAButton />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 sm:px-10 md:px-16 py-16" style={{ backgroundColor: c.cream }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="headline text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: c.navy }}>
              तुमच्या मनातील प्रश्न
            </h2>
            <p className="text-center mb-10" style={{ color: c.muted }}>
              खरेदी करण्यापूर्वी हे नक्की वाचा.
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className="hover-card rounded-lg overflow-hidden"
                  style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  >
                    <span className="text-sm sm:text-base font-semibold" style={{ color: c.navy }}>
                      {i + 1}. {f.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 transition-transform"
                      style={{
                        color: c.marigold,
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm" style={{ color: c.muted }}>
                      {f.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-between gap-3 flex-wrap"
        style={{
          background: `linear-gradient(135deg, ${c.red}, ${c.marigoldDark})`,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
        }}
      >
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
        <button
          className="inline-flex items-center gap-2 rounded-md font-semibold px-5 py-2.5 text-sm sm:text-base"
          style={{ backgroundColor: c.navy, color: c.cream }}
        >
          <BookOpen size={16} />
          आत्ताच खरेदी करा — ₹199
        </button>
      </div>
    </div>
  );
}