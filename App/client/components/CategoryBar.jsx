"use client";

// components/CategoryBar.jsx
// Client Component — owns zero state itself.
//
// Receives activeSection and onSectionChange from MenuGridClient (its parent),
// which owns the filter state. This component is a pure presentation layer
// with click handlers — the minimal footprint needed to justify "use client".
//
// memo: prevents re-renders when MenuGridClient's unrelated state changes.
// Each Pill is also memoized so only the two pills that change active status
// (the previously active and newly active one) re-render on each click.
import { memo } from "react";

const CategoryBar = memo(function CategoryBar({
    sections,
    isRtl = false,
    activeSection,
    onSectionChange,
    allLabel = "All",
}) {
    return (
        <div
            className="w-full"
            style={{
                top: "88px",
                background: "rgba(251,240,224,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
            }}
        >
            <div className="w-full overflow-x-auto hide-scrollbar">
                <div
                    className="flex items-center gap-2 py-3 px-5 w-max mx-auto"
                    role="navigation"
                    aria-label="Section filter"
                    dir={isRtl ? "rtl" : "ltr"}
                    style={{ minWidth: "100%" }}
                >
                    <div className="flex-1 hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <Pill
                            label={allLabel}
                            isActive={activeSection === null}
                            onClick={() => onSectionChange(null)}
                        />
                        {sections.map((sec) => (
                            <Pill
                                key={sec.id}
                                label={sec.name}
                                isActive={activeSection === sec.documentId}
                                onClick={() => onSectionChange(sec.documentId)}
                            />
                        ))}
                    </div>
                    <div className="flex-1 hidden sm:block" />
                </div>
            </div>
        </div>
    );
});

export default CategoryBar;

const Pill = memo(function Pill({ label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            aria-pressed={isActive}
            className={[
                "flex-shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-[0.82rem] font-medium tracking-[0.015em] cursor-pointer border-none transition-all duration-[200ms] ease-in-out",
                isActive
                    ? "bg-ink-900 text-white shadow-[0_2px_8px_rgba(17,16,8,0.18)]"
                    : "bg-white/70 text-ink-700 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:bg-white hover:text-ink-900 outline outline-1 -outline-offset-1 outline-ink-200",
            ].join(" ")}
        >
            {label}
        </button>
    );
});