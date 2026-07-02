import React, { useState } from "react";
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
// `lessonData` मधून video/lesson माहिती, `moduleList` मधून sidebar navigation.
// ============================================================================

const lessonData = {
  courseName: "मराठी लेखन मास्टरक्लास",
  moduleTitle: "मॉड्युल 3: वाक्यरचना आणि प्रवाह",
  lessonTitle: "लेसन 2 — परिच्छेद कसा जोडावा",
  duration: "14:32",
  description:
    "या लेसनमध्ये आपण परिच्छेद एकमेकांशी सुसंगतपणे कसे जोडायचे, आणि वाचकाला प्रवाहात ठेवण्यासाठी कोणते transition शब्द वापरायचे हे शिकणार आहोत.",
  resources: [
    { name: "Lesson notes (PDF)", size: "1.2 MB" },
    { name: "सराव worksheet", size: "480 KB" },
  ],
};

const moduleList = [
  {
    title: "मॉड्युल 1: पायाभूत गोष्टी",
    lessons: [
      { title: "लेसन 1 — सुरुवात कशी करावी", status: "completed" },
      { title: "लेसन 2 — मराठी लेखनाची रचना", status: "completed" },
    ],
  },
  {
    title: "मॉड्युल 3: वाक्यरचना आणि प्रवाह",
    lessons: [
      { title: "लेसन 1 — वाक्य कसं मजबूत करावं", status: "completed" },
      { title: "लेसन 2 — परिच्छेद कसा जोडावा", status: "current" },
      { title: "लेसन 3 — Transition शब्द", status: "locked" },
    ],
  },
  {
    title: "मॉड्युल 4: कथा लेखन",
    lessons: [{ title: "लेसन 1 — पात्र कसं उभं करावं", status: "locked" }],
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

function LessonStatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 size={16} style={{ color: c.green }} />;
  if (status === "current") return <PlayCircle size={16} style={{ color: c.marigoldDark }} />;
  return <Lock size={14} style={{ color: c.muted }} />;
}

function Sidebar({ onClose }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: c.cream }}>
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: `1px solid ${c.line}` }}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={16} style={{ color: c.marigoldDark }} />
          <p className="text-sm font-bold" style={{ color: c.navy }}>{lessonData.courseName}</p>
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
            <p
              className="text-[11px] font-bold uppercase tracking-wide px-2 py-1.5"
              style={{ color: c.muted }}
            >
              {mod.title}
            </p>
            {mod.lessons.map((les, li) => {
              const current = les.status === "current";
              return (
                <div
                  key={li}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg"
                  style={{
                    backgroundColor: current ? "#FBE7CE40" : "transparent",
                    border: current ? `1px solid ${c.marigold}` : "1px solid transparent",
                    opacity: les.status === "locked" ? 0.6 : 1,
                    cursor: les.status === "locked" ? "default" : "pointer",
                  }}
                >
                  <LessonStatusIcon status={les.status} />
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: current ? c.marigoldDark : c.navy }}
                  >
                    {les.title}
                  </p>
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{ backgroundColor: c.paper, color: c.ink, fontFamily: "'Inter', sans-serif" }}
      className="w-full min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .nav-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nav-btn:hover { transform: translateY(-2px); }
        .cta-btn {
          position: relative; overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.marigold} 0%, ${c.red} 100%);
          box-shadow: 0 8px 20px rgba(192,57,43,0.32), 0 6px 0 rgba(0,0,0,0.15);
          font-family: 'Baloo 2', sans-serif;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 26px rgba(192,57,43,0.42), 0 6px 0 rgba(0,0,0,0.15); }
      `}</style>

      {/* Top nav */}
      <div
        className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between"
        style={{ backgroundColor: c.navy }}
      >
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold" style={{ color: c.gold }}>
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>
        <p className="hidden sm:block text-xs font-semibold truncate" style={{ color: "#C9D2E3" }}>
          {lessonData.moduleTitle}
        </p>
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu size={20} style={{ color: c.cream }} />
        </button>
      </div>

      <div className="flex w-full" style={{ minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar - desktop */}
        <div className="hidden lg:block w-80 shrink-0" style={{ borderRight: `1px solid ${c.line}` }}>
          <Sidebar />
        </div>

        {/* Sidebar - mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="w-80 max-w-[85%]">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
            <div
              className="flex-1"
              style={{ backgroundColor: "rgba(30,42,74,0.4)" }}
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 px-5 sm:px-8 md:px-10 py-6 max-w-3xl mx-auto w-full">
          {/* Video placeholder */}
          <div
            className="w-full rounded-xl flex flex-col items-center justify-center gap-2 mb-5"
            style={{ backgroundColor: c.navy, aspectRatio: "16/9" }}
          >
            <PlayCircle size={52} style={{ color: c.gold }} />
            <p className="text-xs font-semibold" style={{ color: "#C9D2E3" }}>{lessonData.duration}</p>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: c.marigoldDark }}>
            {lessonData.moduleTitle}
          </p>
          <h1 className="headline text-xl sm:text-2xl font-extrabold mb-3" style={{ color: c.navy }}>
            {lessonData.lessonTitle}
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: c.muted }}>
            {lessonData.description}
          </p>

          {/* Resources */}
          <div
            className="rounded-xl p-4 sm:p-5 mb-6"
            style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: c.navy }}>
              Resources
            </p>
            <div className="flex flex-col gap-2">
              {lessonData.resources.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                  style={{ backgroundColor: c.paper, border: `1px solid ${c.line}` }}
                >
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

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              className="nav-btn flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg"
              style={{ backgroundColor: c.cream, color: c.navy, border: `1px solid ${c.line}` }}
            >
              <ChevronLeft size={16} /> मागील लेसन
            </button>
            <button className="cta-btn flex items-center gap-1.5 rounded-lg font-semibold px-5 py-2.5 text-sm">
              पुढील लेसन <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}