import React, { useState } from "react";
import {
  PlayCircle,
  Lock,
  CheckCircle2,
  ChevronRight,
  Clock,
  User,
  LogOut,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";

// ============================================================================
// Member Area / Dashboard — लॉगिन केल्यावर दिसणारा main page.
// `courseData` object मधून सगळी module/lesson माहिती बदलता येते.
// ============================================================================

const courseData = {
  courseName: "मराठी लेखन मास्टरक्लास",
  studentName: "Rohan Patil",
  totalModules: 6,
  streakDays: 4,

  continueWatching: {
    moduleTitle: "मॉड्युल 3: वाक्यरचना आणि प्रवाह",
    lessonTitle: "लेसन 2 — परिच्छेद कसा जोडावा",
    progressPercent: 45,
  },

  modules: [
    {
      title: "मॉड्युल 1: पायाभूत गोष्टी",
      status: "completed",
      lessons: 4,
      duration: "48 मिनिटं",
    },
    {
      title: "मॉड्युल 2: शब्दसंग्रह वाढवा",
      status: "completed",
      lessons: 5,
      duration: "1 तास 05 मिनिटं",
    },
    {
      title: "मॉड्युल 3: वाक्यरचना आणि प्रवाह",
      status: "in-progress",
      lessons: 6,
      duration: "1 तास 20 मिनिटं",
      progress: 45,
    },
    {
      title: "मॉड्युल 4: कथा लेखन",
      status: "locked",
      lessons: 5,
      duration: "58 मिनिटं",
    },
    {
      title: "मॉड्युल 5: संपादन आणि सुधारणा",
      status: "locked",
      lessons: 4,
      duration: "50 मिनिटं",
    },
    {
      title: "मॉड्युल 6: प्रकाशन आणि पुढची वाटचाल",
      status: "locked",
      lessons: 3,
      duration: "40 मिनिटं",
    },
  ],
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

function StatusIcon({ status }) {
  if (status === "completed") return <CheckCircle2 size={20} style={{ color: c.green }} />;
  if (status === "in-progress") return <PlayCircle size={20} style={{ color: c.marigoldDark }} />;
  return <Lock size={17} style={{ color: c.muted }} />;
}

function ModuleCard({ mod, index }) {
  const locked = mod.status === "locked";
  const inProgress = mod.status === "in-progress";
  return (
    <div
      className="rounded-xl p-4 sm:p-5 flex items-center gap-4 transition-transform"
      style={{
        backgroundColor: c.cream,
        border: `1px solid ${inProgress ? c.marigold : c.line}`,
        boxShadow: inProgress ? "0 0 0 3px rgba(232,135,30,0.10)" : "none",
        opacity: locked ? 0.75 : 1,
        cursor: locked ? "default" : "pointer",
      }}
    >
      <div
        className="headline w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0"
        style={{
          backgroundColor: locked ? c.paper : c.navy,
          color: locked ? c.muted : c.gold,
          border: locked ? `1px solid ${c.line}` : "none",
        }}
      >
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: c.navy }}>{mod.title}</p>
        <p className="text-xs mt-0.5" style={{ color: c.muted }}>
          {mod.lessons} lessons · {mod.duration}
        </p>
        {inProgress && (
          <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ backgroundColor: c.line }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${mod.progress}%`, background: `linear-gradient(90deg, ${c.marigold}, ${c.red})` }}
            />
          </div>
        )}
      </div>

      <StatusIcon status={mod.status} />
    </div>
  );
}

export default function CourseDashboard() {
  const [tab, setTab] = useState("modules");
  const completedCount = courseData.modules.filter((m) => m.status === "completed").length;
  const overallProgress = Math.round(
    ((completedCount + 0.45) / courseData.totalModules) * 100
  );

  return (
    <div
      style={{ backgroundColor: c.paper, color: c.ink, fontFamily: "'Inter', sans-serif" }}
      className="w-full min-h-screen pb-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        .headline { font-family: 'Baloo 2', sans-serif; }
        .cta-btn {
          position: relative; overflow: hidden;
          color: ${c.cream};
          background: linear-gradient(135deg, ${c.marigold} 0%, ${c.red} 100%);
          box-shadow: 0 8px 20px rgba(192,57,43,0.32), 0 6px 0 rgba(0,0,0,0.15);
          font-family: 'Baloo 2', sans-serif;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 26px rgba(192,57,43,0.42), 0 6px 0 rgba(0,0,0,0.15); }
        .cta-btn:active { transform: translateY(0); }
        .tab-btn { transition: color 0.2s ease, border-color 0.2s ease; }
      `}</style>

      {/* Top nav */}
      <div
        className="w-full px-5 sm:px-10 md:px-16 py-4 flex items-center justify-between"
        style={{ backgroundColor: c.navy }}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={20} style={{ color: c.gold }} />
          <p className="headline font-bold text-base sm:text-lg" style={{ color: c.cream }}>
            {courseData.courseName}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold" style={{ color: c.gold }}>
            <Flame size={14} /> {courseData.streakDays} day streak
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: c.navyLight }}
          >
            <User size={16} style={{ color: c.cream }} />
          </div>
          <LogOut size={17} style={{ color: "#C9D2E3", cursor: "pointer" }} />
        </div>
      </div>

      <div className="px-5 sm:px-10 md:px-16 max-w-4xl mx-auto pt-8 flex flex-col gap-6">
        {/* Welcome + overall progress */}
        <div>
          <h1 className="headline text-xl sm:text-2xl font-extrabold mb-1" style={{ color: c.navy }}>
            नमस्कार, {courseData.studentName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm" style={{ color: c.muted }}>
            तुम्ही आतापर्यंत {completedCount} पैकी {courseData.totalModules} modules पूर्ण केले आहेत.
          </p>
          <div className="w-full h-2.5 rounded-full overflow-hidden mt-3" style={{ backgroundColor: c.line }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${overallProgress}%`, background: `linear-gradient(90deg, ${c.green}, #56A87B)` }}
            />
          </div>
        </div>

        {/* Continue watching card */}
        <div
          className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5"
          style={{ background: `linear-gradient(135deg, ${c.navy}, ${c.navyLight})` }}
        >
          <div
            className="w-full sm:w-40 h-24 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <PlayCircle size={36} style={{ color: c.gold }} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: c.gold }}>
              जिथून सोडलं तिथून सुरू करा
            </p>
            <p className="text-sm font-bold mt-1" style={{ color: c.cream }}>
              {courseData.continueWatching.moduleTitle}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#C9D2E3" }}>
              {courseData.continueWatching.lessonTitle}
            </p>
          </div>
          <button className="cta-btn inline-flex items-center gap-2 rounded-md font-semibold px-5 py-2.5 text-sm shrink-0">
            <PlayCircle size={16} /> सुरू ठेवा
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6" style={{ borderBottom: `1px solid ${c.line}` }}>
          {[
            { id: "modules", label: "Modules" },
            { id: "certificate", label: "Certificate" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="tab-btn text-sm font-bold pb-3 border-b-2"
              style={{
                color: tab === t.id ? c.marigoldDark : c.muted,
                borderColor: tab === t.id ? c.marigold : "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Module list */}
        {tab === "modules" && (
          <div className="flex flex-col gap-3">
            {courseData.modules.map((mod, i) => (
              <ModuleCard key={i} mod={mod} index={i} />
            ))}
          </div>
        )}

        {tab === "certificate" && (
          <div
            className="rounded-xl p-8 flex flex-col items-center text-center gap-3"
            style={{ backgroundColor: c.cream, border: `1px dashed ${c.line}` }}
          >
            <Award size={32} style={{ color: c.gold }} />
            <p className="text-sm font-bold" style={{ color: c.navy }}>Certificate अजून unlock झालेलं नाही</p>
            <p className="text-xs max-w-xs" style={{ color: c.muted }}>
              सगळे {courseData.totalModules} modules पूर्ण केल्यावर तुमचं certificate इथे दिसेल.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}