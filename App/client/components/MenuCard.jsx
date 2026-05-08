import Image from "next/image";

export default function MenuCard({ item, index = 0, onClick }) {
    return (
        <button
            onClick={() => onClick(item)}
            dir="rtl"
            className="menu-card card-lift animate-fade-up rounded-[var(--radius-lg)] overflow-hidden bg-white border border-ink-100 cursor-pointer p-0 text-right w-full opacity-0"
            style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
                fontFamily: "'Noto Sans Arabic', 'Segoe UI', sans-serif",
            }}
        >
            {/* ── Desktop layout: vertical card ── */}
            <div className="flex flex-col sm:flex max-sm:hidden">
                <div className="relative w-full pb-[75%]">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt || item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 900px) 33vw, 300px"
                            loading={index === 0 ? "eager" : "lazy"}
                            priority={index === 0}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-100 text-[2rem]">
                            🍬
                        </div>
                    )}
                    <div
                        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
                        style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
                        }}
                    />
                </div>

                <div className="px-3.5 pt-3 pb-3.5">
                    <p
                        className="line-clamp-2 text-[0.88rem] font-medium text-ink-900 leading-[1.35] mb-1.5"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {item.name}
                    </p>
                    <div className="flex items-baseline justify-between flex-row-reverse">
                        <span dir="ltr" className="text-[0.92rem] font-bold text-gold-600 tracking-[-0.01em]">
                            {Number(item.price).toLocaleString("en-US").replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}
                        </span>
                        <span className="text-[0.68rem] font-medium text-ink-400 tracking-[0.06em] uppercase">
                            د.ع
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Mobile layout: horizontal row (image left, text right) ── */}
            <div className="hidden max-sm:flex flex-row-reverse items-center gap-3.5 px-3.5 py-3">
                <div className="relative w-[100px] shrink-0 rounded-[var(--radius-md)] overflow-hidden aspect-square">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt || item.name}
                            fill
                            className="object-cover"
                            sizes="100px"
                            loading={index === 0 ? "eager" : "lazy"}
                            priority={index === 0}
                        />
                    ) : (
                        <div className="w-full h-full bg-brand-100 flex items-center justify-center text-[1.6rem]">
                            🍬
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 text-right">
                    <p
                        className="line-clamp-2 text-[0.95rem] font-semibold text-ink-900 leading-[1.3]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {item.name}
                    </p>
                    {item.description && (
                        <p className="text-[0.78rem] text-ink-400 leading-[1.4] whitespace-normal break-words">
                            {item.description}
                        </p>
                    )}
                    <div className="flex items-baseline gap-1 mt-0.5 flex-row-reverse">
                        <span dir="ltr" className="text-[0.92rem] font-bold text-gold-600">
                            {Number(item.price).toLocaleString("en-US").replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}
                        </span>
                        <span className="text-[0.65rem] font-medium text-ink-400 tracking-[0.06em] uppercase">
                            د.ع
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}