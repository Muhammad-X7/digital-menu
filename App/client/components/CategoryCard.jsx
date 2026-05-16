// components/CategoryCard.jsx
// Pure Server Component — no "use client", no hooks, zero JS in the browser.
//
// Renders a static <Link> pointing to the category page.
// Appends ?from=<activeSection> to the href when a section is active so that
// CategoryItemsGrid can read it and navigate back to the correct filtered URL
// regardless of any language switches that happened on the category page.
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category, locale, index = 0, isRtl = false, activeSection = null }) {
    const isFirst = index === 0;

    // Build the category href — append ?from=<documentId> when a section is
    // active so the back button in CategoryItemsGrid can restore the filter.
    const href = activeSection
        ? `/${locale}/category/${category.documentId}?from=${activeSection}`
        : `/${locale}/category/${category.documentId}`;

    return (
        <Link
            href={href}
            className="card-lift animate-fade-up relative w-full h-[230px] rounded-[var(--radius-xl)] overflow-hidden bg-brand-100 border-none cursor-pointer text-left p-0 opacity-0 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-[220ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(60,40,10,0.12)] block"
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
                        loading={isFirst ? undefined : "lazy"}
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
            </div>
        </Link>
    );
}

