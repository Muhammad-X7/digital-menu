import Image from "next/image";

export default function CategoryCard({ category, onClick, index = 0 }) {
    const isFirst = index === 0;

    return (
        <button
            onClick={onClick}
            className="category-card-lift"
            style={{
                position: "relative",
                width: "100%",
                height: "230px",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "var(--brand-100)",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s cubic-bezier(0.22,1,0.36,1)",
            }}
        >
            {/* Right: image occupies right 60% */}
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "60%",
                }}
            >
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
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: "var(--brand-100)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                        }}
                    >
                        🍬
                    </div>
                )}
                {/* * Layer over the card to match the image color to the card's background color.
                  * We use 'to light' so the fade goes horizontally from opaque white to transparent.
                  * The card background color is var(--brand-100).
                  */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to right, var(--brand-100) 0%, rgba(255,255,255,0.3) 35%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
            </div>

            {/* Left: text */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "55%",
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    zIndex: 2,
                }}
            >
                <h2
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--ink-900)",
                        lineHeight: 1.2,
                        marginBottom: category.description ? "4px" : 0,
                    }}
                >
                    {category.name}
                </h2>
                {category.description && (
                    <p
                        style={{
                            fontSize: "0.78rem",
                            color: "var(--ink-500)",
                            lineHeight: 1.4,
                            fontWeight: 400,
                            margin: 0,
                        }}
                    >
                        {category.description}
                    </p>
                )}
            </div>

            <style>{`
                .category-card-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(60,40,10,0.12);
                }
            `}</style>
        </button>
    );
}