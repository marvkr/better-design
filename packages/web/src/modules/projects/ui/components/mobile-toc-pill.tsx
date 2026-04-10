import { AnimatePresence, motion } from "motion/react";

type Section = { id: string; title: string };

export function MobileTOCPill({
  sections,
  activeSections,
  scrollToSection,
}: {
  sections: Section[];
  activeSections: Set<string>;
  scrollToSection: (id: string) => void;
}) {
  const activeId = sections.find(s => activeSections.has(s.id))?.id ?? sections[0].id;
  const activeTitle = sections.find(s => s.id === activeId)?.title ?? "";

  return (
    <div className="lg:hidden" style={{
      position: "fixed", bottom: "20px", left: "50%",
      transform: "translateX(-50%)", zIndex: 50,
    }}>
      <button
        onClick={() => scrollToSection(activeId)}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          backgroundColor: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "999px", padding: "8px 16px 8px 12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
          backgroundColor: "var(--primary)", boxShadow: "0 0 6px var(--primary)",
        }} />
        <div style={{ position: "relative", height: "16px", overflow: "hidden" }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={activeId}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center",
                fontSize: "12px", fontWeight: 500,
                color: "var(--foreground)", whiteSpace: "nowrap",
              }}
            >
              {activeTitle}
            </motion.span>
          </AnimatePresence>
          {/* Invisible sizer — keeps container width matching current title */}
          <span style={{
            visibility: "hidden", pointerEvents: "none",
            fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap",
          }}>
            {activeTitle}
          </span>
        </div>
      </button>
    </div>
  );
}
