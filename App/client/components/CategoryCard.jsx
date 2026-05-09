import { memo } from "react";
import Image from "next/image";

// memo: CategoryCard is pure presentational. On the home screen there may be
// many category cards rendered in a grid. Without memo, every card re-renders
// whenever MenuGrid's activeSection state changes (e.g. user clicks a section
// pill). With memo, a card only re-renders when its own props change.
const CategoryCard = memo(function CategoryCard({ category, onClick, index = 0, isRtl = false }) {
    const isFirst = index === 0;

    return (
        <button
            onClick={onClick}
            className="card-lift animate-fade-up relative w-full h-[230px] rounded-[var(--radius-xl)] overflow-hidden bg-brand-100 border-none cursor-pointer text-left p-0 opacity-0 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-[220ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(60,40,10,0.12)]"
            style={{
                animationDelay: `${index * 60}ms`,
                animationFillMode: "both",
            }}
        >
            {/* Image: right side for LTR, left side for RTL */}
            <div className={`absolute top-0 bottom-0 w-[60%] ${isRtl ? "left-0" : "right-0"}`}>
                {category.imageUrl ? (
                    <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 600px) 60vw, 30vw"
                        priority={isFirst}
                        loading={isFirst ? "eager" : "lazy"}
                    />
                ) : (
                    <div className="w-full h-full bg-brand-100 flex items-center justify-center text-[3rem]">
                        🍬
                    </div>
                )}
                {/* Gradient: blends toward text side */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: isRtl
                            ? "linear-gradient(to left, var(--color-brand-100) 0%, rgba(255,255,255,0.3) 35%, transparent 65%)"
                            : "linear-gradient(to right, var(--color-brand-100) 0%, rgba(255,255,255,0.3) 35%, transparent 65%)",
                    }}
                />
            </div>

            {/* Text: left side for LTR, right side for RTL */}
            <div
                className={`absolute top-0 bottom-0 w-[55%] px-6 py-5 flex flex-col justify-end z-[2] ${isRtl ? "right-0 text-right" : "left-0 text-left"}`}
            >
                <h2 className="text-[1.15rem] font-bold text-ink-900 leading-[1.2] mb-1">
                    {category.name}
                </h2>
                {category.description && (
                    <p className="text-[0.78rem] text-ink-500 leading-[1.4] font-normal m-0">
                        {category.description}
                    </p>
                )}
            </div>
        </button>
    );
});

export default CategoryCard;