"use client";

// components/MenuCard.jsx
// Client Component — has an onClick prop that calls into CategoryItemsGrid's
// state setter. "use client" is required for any component that receives
// event handler props in React's server/client model.
//
// memo: CategoryItemsGrid re-renders when selectedItem changes (modal open/
// close). Without memo, all cards re-render on every modal toggle. With memo
// + stable onClick from useCallback in the parent, only cards whose own
// props change will re-render.
//
// useMemo for formattedPrice: toLocaleString + character-map replacement runs
// on every render without memoization. Since item.price and isRtl rarely
// change per card, memoizing keeps the list scroll performant on low-end
// mobile devices.
import { memo, useMemo } from "react";
import Image from "next/image";

const MenuCard = memo(function MenuCard({ item, index = 0, isRtl = false, onClick }) {
    const formattedPrice = useMemo(
        () =>
            isRtl
                ? Number(item.price).toLocaleString("en-US").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d])
                : Number(item.price).toLocaleString("en-US"),
        [item.price, isRtl]
    );

    const currency = isRtl ? "د.ع" : "IQD";

    return (
        <button
            onClick={() => onClick(item)}
            dir={isRtl ? "rtl" : "ltr"}
            className="menu-card card-lift animate-fade-up rounded-[var(--radius-lg)] overflow-hidden bg-white border border-ink-100 cursor-pointer p-0 w-full opacity-0"
            style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
                textAlign: isRtl ? "right" : "left",
            }}
        >
            {/* ── Desktop layout: vertical card ── */}
            <div className="flex flex-col max-sm:hidden">
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
                </div>

                <div className="px-3.5 pt-3 pb-3.5">
                    <p className="line-clamp-2 text-[0.95rem] font-semibold text-ink-900 leading-[1.35] mb-1.5">
                        {item.name}
                    </p>
                    {item.description && (
                        <p className="line-clamp-2 text-[0.78rem] font-light text-ink-500 leading-[1.4] mb-2">
                            {item.description}
                        </p>
                    )}
                    <div className="flex items-baseline gap-1">
                        <span className="text-[0.95rem] font-bold text-gold-600">
                            {formattedPrice}
                        </span>
                        <span className="text-[0.68rem] font-normal text-ink-400 tracking-[0.06em]">
                            {currency}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Mobile layout: horizontal row ── */}
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

                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                    <p className="line-clamp-2 text-[0.95rem] font-semibold text-ink-900 leading-[1.3]">
                        {item.name}
                    </p>
                    {item.description && (
                        <p className="text-[0.78rem] font-light text-ink-500 leading-[1.4] whitespace-normal break-words">
                            {item.description}
                        </p>
                    )}
                    <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[0.92rem] font-bold text-gold-600">
                            {formattedPrice}
                        </span>
                        <span className="text-[0.65rem] font-normal text-ink-400 tracking-[0.06em]">
                            {currency}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
});

export default MenuCard;