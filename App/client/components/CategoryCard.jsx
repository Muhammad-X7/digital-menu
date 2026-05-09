export default function CategoryCard({ category, onClick, index = 0, isRtl = false }) {
    const accents = [
        { bg: "var(--color-brand-100)", border: "var(--color-brand-200)", dot: "var(--color-brand-500)" },
        { bg: "var(--color-cream-200)", border: "var(--color-cream-300)", dot: "var(--color-gold-500)" },
        { bg: "var(--color-ink-50)", border: "var(--color-ink-100)", dot: "var(--color-ink-400)" },
        { bg: "#f5efe6", border: "var(--color-brand-200)", dot: "var(--color-brand-600)" },
    ];
    const accent = accents[index % accents.length];

    return (
        <button
            onClick={onClick}
            dir={isRtl ? "rtl" : "ltr"}
            className="card-lift animate-fade-up w-full rounded-[var(--radius-xl)] overflow-hidden cursor-pointer p-0 border-none text-left opacity-0"
            style={{
                animationDelay: `${index * 60}ms`,
                animationFillMode: "both",
                background: accent.bg,
                border: `1.5px solid ${accent.border}`,
                boxShadow: "0 2px 12px rgba(60,40,10,0.07)",
            }}
        >
            <div className="flex items-center justify-between px-6 py-5 gap-4 min-h-[72px]">
                <span
                    className="text-[1.05rem] font-semibold text-ink-900 leading-[1.25]"
                    style={{ textAlign: isRtl ? "right" : "left" }}
                >
                    {category.name}
                </span>

                <div className="flex items-center gap-2.5 shrink-0">
                    <span className="w-2 h-2 rounded-full" style={{ background: accent.dot }} />
                    <svg
                        width="18" height="18" viewBox="0 0 18 18" fill="none"
                        style={{
                            color: accent.dot,
                            transform: isRtl ? "rotate(180deg)" : "none",
                        }}
                    >
                        <path
                            d="M4 9H14M14 9L10 5M14 9L10 13"
                            stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </button>
    );
}