import { useState } from "react";

const C = {
  bg: "#ffffff",
  surface: "#f7f7f5",
  surfaceHover: "#efefec",
  border: "#e3e2de",
  borderDark: "#d4d3cf",
  text: "#1a1a1a",
  textMuted: "#6b6b6b",
  textDim: "#9a9a9a",
  accent: "#2d7d6f",
  accentLight: "#e8f4f1",
  accentBorder: "#b8ddd5",
  green: "#2d7d4a",
  greenBg: "#eaf5ee",
  greenBorder: "#b8ddb8",
  blue: "#2d5f9e",
  blueBg: "#eaf0f8",
  blueBorder: "#b4cce6",
  purple: "#6b4fa0",
  purpleBg: "#f0ecf6",
  purpleBorder: "#c9bde0",
  orange: "#b5651d",
  orangeBg: "#fdf3e8",
  orangeBorder: "#e6cda8",
  pink: "#a04a6b",
  pinkBg: "#f8ecf1",
  pinkBorder: "#ddb8cc",
  yellow: "#8a7a2d",
  yellowBg: "#f8f5e8",
  yellowBorder: "#ddd8a8",
  red: "#c0392b",
  redBg: "#fdecea",
  redBorder: "#e6b8b4",
};

const nodes = [
  {
    id: "start",
    question: "What are you trying to do?",
    subtitle: "Pick the one that's closest — you can always go back.",
    options: [
      { label: "Add or create something", icon: "＋", next: "create" },
      { label: "Find something that exists", icon: "⌕", next: "find" },
      { label: "Log or record something", icon: "✎", next: "log" },
    ],
  },
  {
    id: "create",
    question: "What kind of thing?",
    options: [
      { label: "A single to-do for someone", icon: "☐", next: "r_task" },
      { label: "A bigger initiative (campaign, launch, overhaul)", icon: "▤", next: "r_project" },
      { label: "A document, SOP, or how-to", icon: "◫", next: "r_opsdocs" },
      { label: "An event or promotion", icon: "◉", next: "r_event" },
      { label: "Something specific to my shop", icon: "⌂", next: "r_hub" },
    ],
  },
  {
    id: "find",
    question: "What are you looking for?",
    options: [
      { label: "An SOP, procedure, or recipe", icon: "◫", next: "f_ops" },
      { label: "A task assigned to me", icon: "☐", next: "f_task" },
      { label: "Meeting notes or a past decision", icon: "◎", next: "f_meeting" },
      { label: "An upcoming event or deadline", icon: "◉", next: "f_event" },
      { label: "Something else — not sure where it is", icon: "…", next: "f_search" },
    ],
  },
  {
    id: "log",
    question: "What are you logging?",
    options: [
      { label: "A meeting that just happened", icon: "◎", next: "r_meeting" },
      { label: "A shift update, issue, or incident", icon: "✎", next: "r_weekly" },
      { label: "A QC walkthrough", icon: "⊘", next: "r_qc" },
    ],
  },
  {
    id: "r_task",
    result: {
      title: "Tasks Tracker",
      color: C.green, bg: C.greenBg, border: C.greenBorder,
      path: "Brew/Bake HQ → Tasks Tracker",
      desc: "One action, one person, one due date. Keep it specific.",
      fields: ["Task", "Assignee", "Location", "Category", "Priority", "Due Date"],
      hint: "If this needs a plan page or involves multiple people, it's probably a Project instead.",
    },
  },
  {
    id: "r_project",
    result: {
      title: "Projects Workspace",
      color: C.orange, bg: C.orangeBg, border: C.orangeBorder,
      path: "Brew/Bake HQ → Projects Workspace",
      desc: "Multi-step work that spans days or weeks. The individual to-dos it generates go in Tasks Tracker.",
      fields: ["Name", "Status", "Type", "Location", "Owner", "Timeline", "Priority"],
      hint: "Use the page body for your brief, plan, and notes. Tasks that come out of this project get their own entries in Tasks Tracker.",
    },
  },
  {
    id: "r_opsdocs",
    result: {
      title: "Operations Docs",
      color: C.accent, bg: C.accentLight, border: C.accentBorder,
      path: "Brew/Bake HQ → Operations Docs",
      desc: "Documented knowledge — SOPs, procedures, recipes, checklists, training materials, and templates.",
      fields: ["Title", "Category", "Doc Status", "Domain", "Locations", "Review Cycle"],
      hint: "Set a Review Cycle so the doc doesn't go stale. Mark Doc Status as Draft until it's ready for the team.",
    },
  },
  {
    id: "r_event",
    result: {
      title: "Event Calendar",
      color: C.pink, bg: C.pinkBg, border: C.pinkBorder,
      path: "Brew/Bake HQ → Event Calendar",
      desc: "Events, holidays, promotions, launches, hours changes — anything with a date the team needs to know about.",
      fields: ["Name", "Date", "Locations", "Type", "Status", "Person In Charge"],
      hint: "Use a date range for multi-day events. If this event needs a full plan, also create a Project for it.",
    },
  },
  {
    id: "r_hub",
    result: {
      title: "Your Location Hub",
      color: C.yellow, bg: C.yellowBg, border: C.yellowBorder,
      path: "BrewLab Hub · BakeLab Urbana Hub · Lodgic Hub",
      desc: "Location-specific info: inventory, contacts, maintenance, local events, and meeting notes.",
      fields: [],
      hint: "If it applies to all locations (an SOP, a campaign, a district task), it belongs in the HQ databases — not your hub.",
    },
  },
  {
    id: "r_meeting",
    result: {
      title: "Meeting Notes",
      color: C.blue, bg: C.blueBg, border: C.blueBorder,
      path: "Brew/Bake HQ → Meeting Notes",
      desc: "Capture what was decided and what actions came out of the meeting.",
      fields: ["Meeting", "Type", "Date", "Location", "Attendees", "Key Decisions"],
      hint: "If you recorded with Granola, paste the link. Fill in Action Items Count so we can track follow-through.",
    },
  },
  {
    id: "r_weekly",
    result: {
      title: "Weekly Log",
      color: C.purple, bg: C.purpleBg, border: C.purpleBorder,
      path: "Brew/Bake HQ → Weekly Log",
      desc: "Operational snapshots — what happened, any issues, general vibe of the day or week.",
      fields: ["Entry", "Location", "Date", "Sentiment", "Severity", "Flagged Issues"],
      hint: "Use Flagged Issues to tag categories (Staffing, Equipment, Quality, etc.) so patterns surface over time.",
    },
  },
  {
    id: "r_qc",
    result: {
      title: "QC Records",
      color: C.red, bg: C.redBg, border: C.redBorder,
      path: "Brew/Bake HQ → QC Records",
      desc: "A dedicated QC form is being built. For now, log QC findings in the Weekly Log.",
      fields: [],
      hint: "Use Source = \"QC Walkthrough\" in the Weekly Log so these entries are easy to filter later.",
    },
  },
  {
    id: "f_ops",
    result: {
      title: "Operations Docs",
      color: C.accent, bg: C.accentLight, border: C.accentBorder,
      path: "Brew/Bake HQ → Operations Docs",
      desc: "Filter by Domain (Coffee, Equipment, Bar, Pastry, etc.) and set Doc Status = Current to see only active docs.",
      fields: [],
      hint: "If the doc you need doesn't exist yet, create it here so the next person can find it.",
    },
  },
  {
    id: "f_task",
    result: {
      title: "Tasks Tracker",
      color: C.green, bg: C.greenBg, border: C.greenBorder,
      path: "Brew/Bake HQ → Tasks Tracker",
      desc: "Filter by Assignee (your name) to see your tasks. Sort by Due Date to prioritize.",
      fields: [],
      hint: "Filter by Location to see everything for your shop. Stale tasks (not edited in 7+ days) may get flagged.",
    },
  },
  {
    id: "f_meeting",
    result: {
      title: "Meeting Notes",
      color: C.blue, bg: C.blueBg, border: C.blueBorder,
      path: "Brew/Bake HQ → Meeting Notes",
      desc: "Filter by Type (Manager 1:1, Staff Meeting, etc.) and Location. Check Key Decisions for quick answers.",
      fields: [],
      hint: "If the meeting was recorded with Granola, the transcript link will be in the Granola Link field.",
    },
  },
  {
    id: "f_event",
    result: {
      title: "Event Calendar",
      color: C.pink, bg: C.pinkBg, border: C.pinkBorder,
      path: "Brew/Bake HQ → Event Calendar",
      desc: "Switch to the Calendar view to see everything by date. Filter by Location for your shop's events.",
      fields: [],
      hint: "Check Status to see what's still in planning vs. what's confirmed and in progress.",
    },
  },
  {
    id: "f_search",
    result: {
      title: "Use Notion Search",
      color: C.textMuted, bg: C.surface, border: C.border,
      path: "Cmd+P (Mac)  ·  Ctrl+P (Windows)",
      desc: "Type any keyword — Notion searches page titles and body text across everything in the workspace.",
      fields: [],
      hint: "Try title keywords first (\"E80 grinder\", \"Matcha Madness\"). If that doesn't work, try filtering inside the database you think it's in.",
    },
  },
];

function App() {
  const [path, setPath] = useState(["start"]);
  const current = nodes.find((n) => n.id === path[path.length - 1]);

  const go = (next) => setPath([...path, next]);
  const back = () => path.length > 1 && setPath(path.slice(0, -1));
  const reset = () => setPath(["start"]);

  const isResult = !!current?.result;
  const depth = path.length - 1;

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "-apple-system, 'Segoe UI', sans-serif",
      padding: "0 16px",
    }}>
      <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 32, paddingBottom: 48 }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 28, paddingBottom: 16,
          borderBottom: `1px solid ${C.border}`,
        }}>
          <span style={{ fontSize: 22 }}>📖</span>
          <span style={{ fontSize: 17, fontWeight: 600, color: C.text }}>
            Brew/Bake HQ Navigator
          </span>
        </div>

        {/* Back / breadcrumb */}
        {depth > 0 && (
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
            <button onClick={back} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 6, padding: "6px 14px", cursor: "pointer",
              fontSize: 13, color: C.textMuted, fontFamily: "inherit",
            }}>
              ← Back
            </button>
            {depth > 1 && (
              <button onClick={reset} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 12, color: C.textDim, textDecoration: "underline",
                textUnderlineOffset: 3, fontFamily: "inherit",
              }}>
                Start over
              </button>
            )}
          </div>
        )}

        {/* Question */}
        {!isResult && current && (
          <>
            <h2 style={{
              fontSize: 22, fontWeight: 600, margin: "0 0 4px", color: C.text, lineHeight: 1.3,
            }}>
              {current.question}
            </h2>
            {current.subtitle && (
              <p style={{ fontSize: 13, color: C.textDim, margin: "0 0 20px" }}>
                {current.subtitle}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {current.options.map((opt, i) => (
                <button key={i} onClick={() => go(opt.next)} style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "14px 16px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: C.text,
                  fontSize: 15,
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.surfaceHover;
                  e.currentTarget.style.borderColor = C.borderDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = C.surface;
                  e.currentTarget.style.borderColor = C.border;
                }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 6,
                    background: C.bg, border: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, color: C.textMuted, flexShrink: 0,
                  }}>
                    {opt.icon}
                  </span>
                  <span style={{ flex: 1 }}>{opt.label}</span>
                  <span style={{ color: C.textDim, fontSize: 16 }}>→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Result */}
        {isResult && current && (() => {
          const r = current.result;
          return (
            <div style={{
              background: r.bg,
              border: `1px solid ${r.border}`,
              borderRadius: 10,
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{ padding: "18px 20px", borderBottom: `1px solid ${r.border}` }}>
                <div style={{ fontSize: 19, fontWeight: 600, color: r.color, marginBottom: 3 }}>
                  {r.title}
                </div>
                <div style={{
                  fontSize: 13, color: C.textMuted,
                  fontFamily: "SFMono-Regular, Menlo, monospace",
                }}>
                  {r.path}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: C.text, margin: "0 0 14px" }}>
                  {r.desc}
                </p>

                {/* Fields */}
                {r.fields.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{
                      fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                      letterSpacing: "0.06em", color: C.textDim, marginBottom: 7,
                    }}>
                      Fields to fill in
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {r.fields.map((f, i) => (
                        <span key={i} style={{
                          background: C.bg,
                          border: `1px solid ${r.border}`,
                          color: r.color,
                          borderRadius: 4,
                          padding: "2px 9px",
                          fontSize: 12,
                          fontWeight: 500,
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hint */}
                {r.hint && (
                  <div style={{
                    background: C.bg,
                    border: `1px solid ${r.border}`,
                    borderRadius: 6,
                    padding: "10px 14px",
                    fontSize: 13,
                    color: C.textMuted,
                    lineHeight: 1.5,
                  }}>
                    <strong style={{ color: r.color }}>Tip: </strong>
                    {r.hint}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{ padding: "0 20px 16px" }}>
                <button onClick={reset} style={{
                  background: C.bg, border: `1px solid ${r.border}`,
                  borderRadius: 6, padding: "8px 16px", cursor: "pointer",
                  fontSize: 13, color: C.textMuted, fontFamily: "inherit",
                }}>
                  ← Start over
                </button>
              </div>
            </div>
          );
        })()}

        {/* Footer */}
        <div style={{
          marginTop: 32, paddingTop: 16, borderTop: `1px solid ${C.border}`,
          fontSize: 12, color: C.textDim, textAlign: "center",
        }}>
          Brew/Bake HQ · Updated March 2026 · Questions? Ask Drew
        </div>
      </div>
    </div>
  );
}

export default App;