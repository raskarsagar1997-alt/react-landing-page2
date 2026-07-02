import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Download,
  CheckCircle2,
  Tag,
  AlertTriangle,
  MousePointerClick,
  Sparkles,
  XCircle,
  Zap,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Wallet,
  HelpCircle,
} from "lucide-react";
import defaultContent from "./siteContent";

const STORAGE_KEY = "spoken_english_site_content";

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

const TABS = [
  { key: "brand", label: "Brand & Navbar", icon: Tag },
  { key: "urgency", label: "Urgency Banner", icon: AlertTriangle },
  { key: "cta", label: "CTA Button", icon: MousePointerClick },
  { key: "hero", label: "Hero Section", icon: Sparkles },
  { key: "pain", label: "Pain Points", icon: XCircle },
  { key: "access", label: "Access Features", icon: Zap },
  { key: "why", label: "Why Choose Us", icon: ShieldCheck },
  { key: "timeline", label: "Timeline", icon: Calendar },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
  { key: "pricing", label: "Pricing", icon: Wallet },
  { key: "faq", label: "FAQ", icon: HelpCircle },
];

/* ---------- Reusable form building blocks ---------- */

function Card({ title, description, children }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: c.cream, border: `1px solid ${c.line}` }}
    >
      <h2 className="text-lg font-bold mb-1" style={{ color: c.navy }}>
        {title}
      </h2>
      {description && (
        <p className="text-sm mb-5" style={{ color: c.muted }}>
          {description}
        </p>
      )}
      <div className="flex flex-col gap-4 mt-4">{children}</div>
    </div>
  );
}

function Field({ label, hint, value, onChange, textarea }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-semibold" style={{ color: c.navy }}>
        {label}
        {hint && (
          <span className="font-normal ml-1.5" style={{ color: c.muted }}>
            {hint}
          </span>
        )}
      </span>
      <Comp
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className="rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-current"
        style={{
          border: `1px solid ${c.line}`,
          backgroundColor: "#fff",
          color: c.ink,
        }}
      />
    </label>
  );
}

function ArrayEditor({ items, onChange, renderItem, emptyItem, addLabel = "Add Item" }) {
  const update = (i, newItem) => {
    const next = [...items];
    next[i] = newItem;
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, emptyItem]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-4 relative"
          style={{ border: `1px dashed ${c.line}`, backgroundColor: c.paper }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#FBE7CE", color: c.marigoldDark }}
            >
              Item {i + 1}
            </span>
            <button
              onClick={() => remove(i)}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md"
              style={{ color: c.red }}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>
          <div className="flex flex-col gap-3">{renderItem(item, (newItem) => update(i, newItem))}</div>
        </div>
      ))}
      <button
        onClick={add}
        className="self-start inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2.5 rounded-lg"
        style={{ backgroundColor: "#FBE7CE", color: c.marigoldDark }}
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

/* ---------- Main Editor Page ---------- */

export default function AdminEditor() {
  const [content, setContent] = useState(defaultContent);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContent(JSON.parse(raw));
    } catch (e) {
      // ignore corrupted storage, fall back to defaults
    }
  }, []);

  const set = (path, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      let cursor = next;
      for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]];
      cursor[path[path.length - 1]] = value;
      return next;
    });
    setSaved(false);
  };

  const setArray = (path, value) => set(path, value);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (!window.confirm("Reset all changes and restore the default content?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setContent(defaultContent);
  };

  const handleDownload = () => {
    const fileText = `const siteContent = ${JSON.stringify(content, null, 2)};\n\nexport default siteContent;\n`;
    const blob = new Blob([fileText], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "siteContent.js";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ backgroundColor: c.paper, minHeight: "100vh", color: c.ink }} className="w-full">
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between gap-3 px-5 sm:px-8 py-4 flex-wrap"
        style={{ backgroundColor: c.navy, borderBottom: `1px solid ${c.navyLight}` }}
      >
        <div className="flex items-center gap-2">
          {saved && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#7FD9A0" }}>
              <CheckCircle2 size={15} /> Saved
            </span>
          )}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
            style={{ backgroundColor: c.navyLight, color: c.cream }}
          >
            <Download size={14} /> Download File
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
            style={{ backgroundColor: c.navyLight, color: c.cream }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg"
            style={{ background: `linear-gradient(135deg, ${c.gold}, ${c.marigold})`, color: c.navy }}
          >
            <Save size={14} /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        {/* Sidebar nav */}
        <div
          className="md:w-56 shrink-0 md:sticky md:top-[73px] md:h-[calc(100vh-73px)] overflow-x-auto md:overflow-y-auto px-4 py-4 md:py-6 flex md:flex-col gap-1"
          style={{ borderRight: `1px solid ${c.line}` }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="shrink-0 inline-flex items-center gap-2.5 text-sm font-semibold px-3.5 py-2.5 rounded-lg text-left whitespace-nowrap"
                style={{
                  backgroundColor: isActive ? "#FBE7CE" : "transparent",
                  color: isActive ? c.marigoldDark : c.muted,
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active section content */}
        <div className="flex-1 px-5 sm:px-8 py-6 sm:py-8 max-w-2xl">
          {activeTab === "brand" && (
            <Card title="Brand & Navbar" description="The logo text and top navbar button.">
              <Field label="Brand Name" value={content.brand.name} onChange={(v) => set(["brand", "name"], v)} />
              <Field
                label="Navbar CTA Label"
                value={content.brand.navCtaLabel}
                onChange={(v) => set(["brand", "navCtaLabel"], v)}
              />
            </Card>
          )}

          {activeTab === "urgency" && (
            <Card title="Urgency Banner" description="The scrolling strip at the very top of the page.">
              <Field
                label="Banner Text"
                hint="(use {claimed} and {total} as placeholders)"
                value={content.urgencyBanner.text}
                onChange={(v) => set(["urgencyBanner", "text"], v)}
                textarea
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Claimed"
                  hint="(sold so far)"
                  value={content.urgencyBanner.claimed}
                  onChange={(v) => set(["urgencyBanner", "claimed"], Number(v) || 0)}
                />
                <Field
                  label="Total"
                  hint="(total slots)"
                  value={content.urgencyBanner.total}
                  onChange={(v) => set(["urgencyBanner", "total"], Number(v) || 0)}
                />
              </div>
            </Card>
          )}

          {activeTab === "cta" && (
            <Card title="CTA Button" description="Wording used on every call-to-action button on the page.">
              <Field label="Button Label" value={content.cta.label} onChange={(v) => set(["cta", "label"], v)} />
              <Field label="Price" value={content.cta.price} onChange={(v) => set(["cta", "price"], v)} />
              <Field
                label="Sticky Bottom Bar Label"
                value={content.cta.stickyBarLabel}
                onChange={(v) => set(["cta", "stickyBarLabel"], v)}
              />
            </Card>
          )}

          {activeTab === "hero" && (
            <Card title="Hero Section" description="The main heading area at the top of the page.">
              <Field label="Eyebrow" hint="(small tag above the headline)" value={content.hero.eyebrow} onChange={(v) => set(["hero", "eyebrow"], v)} />
              <Field label="Headline Line 1" value={content.hero.headlineLine1} onChange={(v) => set(["hero", "headlineLine1"], v)} />
              <Field
                label="Headline Highlight"
                hint="(the colored part)"
                value={content.hero.headlineHighlight}
                onChange={(v) => set(["hero", "headlineHighlight"], v)}
              />
              <Field label="Headline Line 2" value={content.hero.headlineLine2} onChange={(v) => set(["hero", "headlineLine2"], v)} />
              <Field label="Subtext 1" value={content.hero.subtext1} onChange={(v) => set(["hero", "subtext1"], v)} textarea />
              <Field label="Subtext 2" value={content.hero.subtext2} onChange={(v) => set(["hero", "subtext2"], v)} textarea />

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                3D Book Card
              </p>
              <Field
                label="Badge Number"
                value={content.hero.bookCard.badgeNumber}
                onChange={(v) => set(["hero", "bookCard", "badgeNumber"], v)}
              />
              <Field
                label="Badge Title"
                value={content.hero.bookCard.badgeTitle}
                onChange={(v) => set(["hero", "bookCard", "badgeTitle"], v)}
              />
            </Card>
          )}

          {activeTab === "pain" && (
            <Card title="Pain Points" description="The list of struggles shown under 'Sound familiar?'.">
              <Field label="Section Heading" value={content.painPointsHeading} onChange={(v) => set(["painPointsHeading"], v)} />
              <ArrayEditor
                items={content.painPoints}
                emptyItem=""
                addLabel="Add Pain Point"
                onChange={(next) => setArray(["painPoints"], next)}
                renderItem={(item, update) => <Field label="Pain Point" value={item} onChange={update} />}
              />
              <Field
                label="Note"
                hint="(reassurance message below the list)"
                value={content.painPointsNote}
                onChange={(v) => set(["painPointsNote"], v)}
                textarea
              />
            </Card>
          )}

          {activeTab === "access" && (
            <Card title="Access Features" description="The row of small icons (Mobile, Laptop, Lifetime Access, etc).">
              <ArrayEditor
                items={content.accessFeatures}
                emptyItem={{ iconKey: "Zap", label: "" }}
                addLabel="Add Feature"
                onChange={(next) => setArray(["accessFeatures"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field
                      label="Icon Key"
                      hint="(Smartphone / Laptop / GraduationCap / Zap / InfinityIcon)"
                      value={item.iconKey}
                      onChange={(v) => update({ ...item, iconKey: v })}
                    />
                    <Field label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
                  </>
                )}
              />
            </Card>
          )}

          {activeTab === "why" && (
            <Card title="Why Choose Us" description="The 4-column grid of reasons to buy.">
              <Field label="Eyebrow" value={content.whyChooseUs.eyebrow} onChange={(v) => set(["whyChooseUs", "eyebrow"], v)} />
              <Field label="Heading" value={content.whyChooseUs.heading} onChange={(v) => set(["whyChooseUs", "heading"], v)} />
              <ArrayEditor
                items={content.whyChooseUs.items}
                emptyItem={{ iconKey: "Award", title: "", text: "" }}
                addLabel="Add Reason"
                onChange={(next) => setArray(["whyChooseUs", "items"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field
                      label="Icon Key"
                      hint="(ShieldCheck / BookOpen / InfinityIcon / Award)"
                      value={item.iconKey}
                      onChange={(v) => update({ ...item, iconKey: v })}
                    />
                    <Field label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                    <Field label="Description" value={item.text} onChange={(v) => update({ ...item, text: v })} textarea />
                  </>
                )}
              />
            </Card>
          )}

          {activeTab === "timeline" && (
            <Card title="Timeline" description="The Week 1-2 / Week 3 / Day 30 progress steps.">
              <Field label="Heading" value={content.timelineSection.heading} onChange={(v) => set(["timelineSection", "heading"], v)} />
              <Field label="Subheading" value={content.timelineSection.subheading} onChange={(v) => set(["timelineSection", "subheading"], v)} />
              <ArrayEditor
                items={content.timelineSection.items}
                emptyItem={{ tag: "", text: "" }}
                addLabel="Add Milestone"
                onChange={(next) => setArray(["timelineSection", "items"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field label="Tag" hint="(e.g. WEEK 1)" value={item.tag} onChange={(v) => update({ ...item, tag: v })} />
                    <Field label="Description" value={item.text} onChange={(v) => update({ ...item, text: v })} textarea />
                  </>
                )}
              />
            </Card>
          )}

          {activeTab === "testimonials" && (
            <Card title="Testimonials" description="Student chat-style reviews.">
              <Field
                label="Heading"
                value={content.testimonialsSection.heading}
                onChange={(v) => set(["testimonialsSection", "heading"], v)}
              />
              <ArrayEditor
                items={content.testimonialsSection.items}
                emptyItem={{ msg: "", reply: "" }}
                addLabel="Add Testimonial"
                onChange={(next) => setArray(["testimonialsSection", "items"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field label="Student Message" value={item.msg} onChange={(v) => update({ ...item, msg: v })} textarea />
                    <Field label="Reply" value={item.reply} onChange={(v) => update({ ...item, reply: v })} textarea />
                  </>
                )}
              />
            </Card>
          )}

          {activeTab === "pricing" && (
            <Card title="Pricing" description="The offer breakdown and pricing table.">
              <Field
                label="Card Title"
                value={content.pricingSection.cardTitle}
                onChange={(v) => set(["pricingSection", "cardTitle"], v)}
              />
              <Field
                label="Today's Price"
                value={content.pricingSection.todayPrice}
                onChange={(v) => set(["pricingSection", "todayPrice"], v)}
              />
              <Field
                label="Total Value"
                hint="(shown with strikethrough)"
                value={content.pricingSection.totalValueStrikethrough}
                onChange={(v) => set(["pricingSection", "totalValueStrikethrough"], v)}
              />
              <ArrayEditor
                items={content.pricingSection.offerItems}
                emptyItem={{ title: "", sub: "", price: "", free: false }}
                addLabel="Add Offer Item"
                onChange={(next) => setArray(["pricingSection", "offerItems"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                    <Field label="Subtitle" value={item.sub} onChange={(v) => update({ ...item, sub: v })} />
                    <Field label="Price" value={item.price} onChange={(v) => update({ ...item, price: v })} />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.free}
                        onChange={(e) => update({ ...item, free: e.target.checked })}
                      />
                      <span style={{ color: c.navy }}>Show FREE badge</span>
                    </label>
                  </>
                )}
              />
            </Card>
          )}

          {activeTab === "faq" && (
            <Card title="FAQ" description="Frequently asked questions and answers.">
              <Field label="Heading" value={content.faqSection.heading} onChange={(v) => set(["faqSection", "heading"], v)} />
              <ArrayEditor
                items={content.faqSection.items}
                emptyItem={{ q: "", a: "" }}
                addLabel="Add Question"
                onChange={(next) => setArray(["faqSection", "items"], next)}
                renderItem={(item, update) => (
                  <>
                    <Field label="Question" value={item.q} onChange={(v) => update({ ...item, q: v })} textarea />
                    <Field label="Answer" value={item.a} onChange={(v) => update({ ...item, a: v })} textarea />
                  </>
                )}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
