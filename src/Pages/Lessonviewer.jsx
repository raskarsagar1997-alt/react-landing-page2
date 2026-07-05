import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlayCircle,
  Lock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
  FileText,
  Download,
  BookOpen,
} from "lucide-react";

// ============================================================================
// Lesson Viewer — एक lesson प्रत्यक्ष बघतानाचा page.
// Sidebar मधल्या lesson वर क्लिक केलं की तीच lesson उघडते (unlocked असेल तर).
// Prev/Next बटणं flattened lesson list मध्ये पुढे-मागे नेतात.
// "Dashboard" बटण /dashboard वर परत नेतं.
// ============================================================================

const courseName = "मराठी लेखन मास्टरक्लास";

const moduleList = [
  {
    title: "मॉड्युल 1: पायाभूत गोष्टी",
    lessons: [
      { title: "लेसन 1 — सुरुवात कशी करावी", status: "completed", duration: "9:12", description: "मराठी लेखनाला सुरुवात करण्यासाठी लागणाऱ्या मूलभूत गोष्टी आणि मानसिकता याबद्दल चर्चा." },
      { title: "लेसन 2 — मराठी लेखनाची रचना", status: "completed", duration: "11:04", description: "वाक्य आणि परिच्छेदाची मूलभूत रचना कशी असावी हे या लेसनमध्ये शिकाल." },
    ],
  },
  {
    title: "मॉड्युल 3: वाक्यरचना आणि प्रवाह",
    lessons: [
      { title: "लेसन 1 — वाक्य कसं मजबूत करावं", status: "completed", duration: "12:47", description: "वाक्य अधिक प्रभावी आणि स्पष्ट कसं बनवायचं याचे तंत्र." },
      {
        title: "लेसन 2 — परिच्छेद कसा जोडावा",
        status: "current",
        duration: "14:32",
        description:
          "या लेसनमध्ये आपण परिच्छेद एकमेकांशी सुसंगतपणे कसे जोडायचे, आणि वाचकाला प्रवाहात ठेवण्यासाठी कोणते transition शब्द वापरायचे हे शिकणार आहोत.",
        resources: [
          { name: "Lesson notes (PDF)", size: "1.2 MB" },
          { name: "सराव worksheet", size: "480 KB" },
        ],
      },
      { title: "लेसन 3 — Transition शब्द", status: "locked", duration: "10:20", description: "वाक्यांमधला प्रवाह टिकवण्यासाठी वापरले जाणारे महत्त्वाचे transition शब्द." },
    ],
  },
  {
    title: "मॉड्युल 4: कथा लेखन",
    lessons: [{ title: "लेसन 1 — पात्र कसं उभं करावं", status: "locked", duration: "13:05", description: "आकर्षक आणि खरं वाटणारं पात्र कसं तयार करायचं." }],
  },
];

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

function flattenLessons() {
  const flat = [];
  moduleList.forEach((mod, mi) => {
    mod.lessons.forEach((les, li) => {
      flat.push({ ...les, moduleTitle: mod.title, moduleIndex: mi, lessonIndex: li });
    });
  });
  return flat;
}

function LessonStatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 size={16} style={{ color: c.green }} />;
  if (status === "current") return <PlayCircle size={16} style={{ color: c.marigoldDark }} />;
  return <Lock size={14} style={{ color: c.muted }} />;
}

function Sidebar({ activeFlatIndex, flatLessons, onSelect, onClose }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: c.cream }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${c.line}` }}>
        <div className="flex items-center gap-2">
          <BookOpen size={16} style={{ color: c.marigoldDark }} />
          <p className="text-sm font-bold" style={{ color: c.navy }}>{courseName}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden">
            <X size={18} style={{ color: c.muted }} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {moduleList.map((mod, mi) => (
          <div key={mi} className="mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wide px-2 py-1.5" style={{ color: c.muted }}>{mod.title}</p>
            {mod.lessons.map((les, li) => {
              const flatIdx = flatLessons.findIndex((f) => f.moduleIndex === mi && f.lessonIndex === li);
              const isActive = flatIdx === activeFlatIndex;
              const locked = les.status === "locked" && !isActive;
              return (
                <div
                  key={li}
                  onClick={() => !locked && onSelect(flatIdx)}
                  className="lesson-row flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
                  style={{
                    backgroundColor: isActive ? "#FBE7CE40" : "transparent",
                    border: isActive ? `1px solid ${c.marigold}` : "1px solid transparent",
                    opacity: locked ? 0.6 : 1,
                    cursor: locked ? "default" : "pointer",
                  }}
                >
                  <LessonStatusIcon status={isActive ? "current" : les.status} />
                  <p className="text-xs font-semibold truncate" style={{ color: isActive ? c.marigoldDark : c.navy }}>{les.title}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LessonViewer() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const flatLessons = useMemo(() => flattenLessons(), []);
  const initialIndex = flatLessons.findIndex((l) => l.status === "current");
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const lesson = flatLessons[activeIndex];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < flatLessons.length - 1 && flatLessons[activeIndex + 1].status !== "locked";

  return (
    <div style={{ backgroundColor: c.paper, color: c.ink, fontFamily: "'Inter', sans-serif" }} className="w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .nav-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease; }
        .nav-btn:hover:not(:disabled) { transform: translateY(-2px); }
        .nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .cta-btn {
          position: relative; overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.marigold} 0%, ${c.red} 100%);
          box-shadow: 0 8px 20px rgba(192,57,43,0.32), 0 6px 0 rgba(0,0,0,0.15);
          font-family: 'Baloo 2', sans-serif;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 14px 26px rgba(192,57,43,0.42), 0 6px 0 rgba(0,0,0,0.15); }
        .cta-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .lesson-row { transition: background-color 0.2s ease, transform 0.15s ease; }
        .lesson-row:hover:not([style*="cursor: default"]) { transform: translateX(2px); }
        .video-box { transition: box-shadow 0.3s ease; box-shadow: 0 16px 32px rgba(15,26,51,0.25); }
        .resource-row { transition: transform 0.2s ease, border-color 0.2s ease; }
        .resource-row:hover { transform: translateX(2px); border-color: ${c.gold} !important; }
        .back-btn { transition: transform 0.2s ease; }
        .back-btn:hover { transform: translateX(-2px); }
      `}</style>

      {/* Top nav */}
      <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between" style={{ backgroundColor: c.navy }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="back-btn flex items-center gap-1.5 text-xs sm:text-sm font-semibold" style={{ color: c.gold }}>
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>
        <p className="hidden sm:block text-xs font-semibold truncate" style={{ color: "#C9D2E3" }}>{lesson.moduleTitle}</p>
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} style={{ color: c.cream }} />
        </button>
      </div>

      <div className="flex w-full" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="hidden lg:block w-80 shrink-0" style={{ borderRight: `1px solid ${c.line}` }}>
          <Sidebar activeFlatIndex={activeIndex} flatLessons={flatLessons} onSelect={setActiveIndex} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="w-80 max-w-[85%]">
              <Sidebar
                activeFlatIndex={activeIndex}
                flatLessons={flatLessons}
                onSelect={(i) => {
                  setActiveIndex(i);
                  setSidebarOpen(false);
                }}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
            <div className="flex-1" style={{ backgroundColor: "rgba(30,42,74,0.4)" }} onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 px-5 sm:px-8 md:px-10 py-6 max-w-3xl mx-auto w-full">
          <div className="video-box w-full rounded-xl flex flex-col items-center justify-center gap-2 mb-5" style={{ backgroundColor: c.navy, aspectRatio: "16/9" }}>
            <PlayCircle size={52} style={{ color: c.gold }} />
            <p className="text-xs font-semibold" style={{ color: "#C9D2E3" }}>{lesson.duration}</p>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: c.marigoldDark }}>{lesson.moduleTitle}</p>
          <h1 className="headline text-xl sm:text-2xl font-extrabold mb-3" style={{ color: c.navy }}>{lesson.title}</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: c.muted }}>{lesson.description}</p>

          {lesson.resources && (
            <div className="rounded-xl p-4 sm:p-5 mb-6" style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: c.navy }}>Resources</p>
              <div className="flex flex-col gap-2">
                {lesson.resources.map((r, i) => (
                  <div key={i} className="resource-row flex items-center justify-between px-3 py-2.5 rounded-lg" style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}>
                    <div className="flex items-center gap-2.5">
                      <FileText size={16} style={{ color: c.marigoldDark }} />
                      <div>
                        <p className="text-xs font-semibold" style={{ color: c.navy }}>{r.name}</p>
                        <p className="text-[10px]" style={{ color: c.muted }}>{r.size}</p>
                      </div>
                    </div>
                    <Download size={15} style={{ color: c.muted, cursor: "pointer" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              disabled={!canGoPrev}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              className="nav-btn flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg"
              style={{ backgroundColor: c.cream, color: c.navy, border: `1px solid ${c.line}` }}
            >
              <ChevronLeft size={16} /> मागील लेसन
            </button>
            <button
              disabled={!canGoNext}
              onClick={() => setActiveIndex((i) => Math.min(flatLessons.length - 1, i + 1))}
              className="cta-btn flex items-center gap-1.5 rounded-lg font-semibold px-5 py-2.5 text-sm"
            >
              पुढील लेसन <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}