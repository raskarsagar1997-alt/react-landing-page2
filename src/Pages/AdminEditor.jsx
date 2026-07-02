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
  CreditCard,
} from "lucide-react";
import defaultContent from "./siteContent";

// ============================================================================
// AdminEditor.jsx
// ----------------------------------------------------------------------------
// A separate PAGE where every text / price / list item on the landing page
// can be typed into a form. Hitting "Save" writes changes to the browser's
// localStorage, and the landing page automatically picks them up (changes
// survive a refresh).
//
// One-line change needed in SpokenEnglishLanding.jsx:
//   import defaultContent from "./siteContent";
//   const siteContent = getStoredContent(defaultContent);
// (helper provided in contentStore.js)
//
// Add the route (react-router):
//   <Route path="/admin" element={<AdminEditor />} />
// ============================================================================

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
  { key: "checkout", label: "Checkout Page", icon: CreditCard },
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
        <div>
          <p className="text-xs mt-0.5" style={{ color: "#9FACC9" }}>
            Edit content on the left, hit Save — the landing page updates instantly
          </p>
        </div>
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

          {activeTab === "checkout" && (
            <Card title="Checkout Page" description="The /checkout page shown after clicking any Buy button.">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: c.marigoldDark }}>
                Headline
              </p>
              <Field label="Headline Line 1" value={content.checkoutSection.headlineLine1} onChange={(v) => set(["checkoutSection", "headlineLine1"], v)} />
              <Field label="Headline Highlight" hint="(colored part)" value={content.checkoutSection.headlineHighlight} onChange={(v) => set(["checkoutSection", "headlineHighlight"], v)} />
              <Field label="Headline Line 2" value={content.checkoutSection.headlineLine2} onChange={(v) => set(["checkoutSection", "headlineLine2"], v)} />
              <Field label="Subtext" value={content.checkoutSection.subtext} onChange={(v) => set(["checkoutSection", "subtext"], v)} textarea />

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Form Fields
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Name Field Label" value={content.checkoutSection.formLabels.nameLabel} onChange={(v) => set(["checkoutSection", "formLabels", "nameLabel"], v)} />
                <Field label="Name Placeholder" value={content.checkoutSection.formLabels.namePlaceholder} onChange={(v) => set(["checkoutSection", "formLabels", "namePlaceholder"], v)} />
                <Field label="Email Field Label" value={content.checkoutSection.formLabels.emailLabel} onChange={(v) => set(["checkoutSection", "formLabels", "emailLabel"], v)} />
                <Field label="Email Placeholder" value={content.checkoutSection.formLabels.emailPlaceholder} onChange={(v) => set(["checkoutSection", "formLabels", "emailPlaceholder"], v)} />
                <Field label="Phone Field Label" value={content.checkoutSection.formLabels.phoneLabel} onChange={(v) => set(["checkoutSection", "formLabels", "phoneLabel"], v)} />
                <Field label="Phone Placeholder" value={content.checkoutSection.formLabels.phonePlaceholder} onChange={(v) => set(["checkoutSection", "formLabels", "phonePlaceholder"], v)} />
              </div>

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Order Item Card
              </p>
              <Field label="Plan Title" value={content.checkoutSection.orderItem.planTitle} onChange={(v) => set(["checkoutSection", "orderItem", "planTitle"], v)} />
              <Field label="Plan Subtitle" value={content.checkoutSection.orderItem.planSubtitle} onChange={(v) => set(["checkoutSection", "orderItem", "planSubtitle"], v)} />
              <Field label="Plan Price" hint="(numbers only, e.g. 199)" value={content.checkoutSection.orderItem.planPrice} onChange={(v) => set(["checkoutSection", "orderItem", "planPrice"], v)} />
              <Field label="Company Name" value={content.checkoutSection.orderItem.companyName} onChange={(v) => set(["checkoutSection", "orderItem", "companyName"], v)} />
              <Field label="Total Price" hint="(e.g. 199.00)" value={content.checkoutSection.orderItem.totalPrice} onChange={(v) => set(["checkoutSection", "orderItem", "totalPrice"], v)} />

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Payment Section
              </p>
              <Field label="Gateway Name" value={content.checkoutSection.payment.gatewayName} onChange={(v) => set(["checkoutSection", "payment", "gatewayName"], v)} />
              <Field label="Pay Button Label" value={content.checkoutSection.payment.buttonLabel} onChange={(v) => set(["checkoutSection", "payment", "buttonLabel"], v)} />
              <Field label="Secure Payment Note" value={content.checkoutSection.payment.secureNote} onChange={(v) => set(["checkoutSection", "payment", "secureNote"], v)} />

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Offer Summary (right side)
              </p>
              <Field label="Gift Box Title" value={content.checkoutSection.summary.giftBoxTitle} onChange={(v) => set(["checkoutSection", "summary", "giftBoxTitle"], v)} />
              <Field label="Gift Box Subtitle" value={content.checkoutSection.summary.giftBoxSubtitle} onChange={(v) => set(["checkoutSection", "summary", "giftBoxSubtitle"], v)} />
              <Field label="Total Value" hint="(strikethrough)" value={content.checkoutSection.summary.totalValue} onChange={(v) => set(["checkoutSection", "summary", "totalValue"], v)} />
              <Field label="Final Price" value={content.checkoutSection.summary.finalPrice} onChange={(v) => set(["checkoutSection", "summary", "finalPrice"], v)} />
              <Field label="CTA Button Label" value={content.checkoutSection.summary.ctaLabel} onChange={(v) => set(["checkoutSection", "summary", "ctaLabel"], v)} />
              <Field label="Footer Note" value={content.checkoutSection.summary.footerNote} onChange={(v) => set(["checkoutSection", "summary", "footerNote"], v)} />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Claimed"
                  value={content.checkoutSection.claimed}
                  onChange={(v) => set(["checkoutSection", "claimed"], Number(v) || 0)}
                />
                <Field
                  label="Total"
                  value={content.checkoutSection.total}
                  onChange={(v) => set(["checkoutSection", "total"], Number(v) || 0)}
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Sticky Timer Bar
              </p>
              <Field label="Timer Bar Label" value={content.checkoutSection.stickyBar.label} onChange={(v) => set(["checkoutSection", "stickyBar", "label"], v)} />

              <p className="text-xs font-bold uppercase tracking-wider mt-2" style={{ color: c.marigoldDark }}>
                Offer Items (right-side list)
              </p>
              <ArrayEditor
                items={content.checkoutSection.offerItems}
                emptyItem={{ title: "", sub: "", price: "", free: false }}
                addLabel="Add Offer Item"
                onChange={(next) => setArray(["checkoutSection", "offerItems"], next)}
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
