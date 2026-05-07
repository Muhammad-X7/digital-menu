"use client";

import { useState } from "react";
import CategoryCard from "./CategoryCard";
import MenuCard from "./MenuCard";
import ItemModal from "./ItemModal";

export default function MenuGrid({ items, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // If no category selected, show category cards grid (homepage)
  if (activeCategory === null) {
    return (
      <>
        <main
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "12px 32px 60px",
          }}
        >
          <div className="category-grid">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={i}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </main>

        <style>{`
          .category-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          @media (min-width: 601px) {
            .category-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          }
        `}</style>

        {selectedItem && (
          <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </>
    );
  }

  // Category selected — show items with a back bar
  const filtered = items.filter((item) => item.categoryId === activeCategory);
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <>
      {/* Back bar */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 32px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--ink-700)",
            background: "#fff",
            border: "1px solid var(--ink-100)",
            borderRadius: "var(--radius-full)",
            padding: "7px 16px",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          ← Back
        </button>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--ink-900)",
          }}
        >
          {activeCat?.name}
        </span>
      </div>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 32px 60px",
        }}
      >
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="menu-grid">
            {filtered.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                index={i}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        )}
      </main>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      <style>{`
        .menu-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 601px) {
          .menu-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
      `}</style>
    </>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--ink-100)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
          marginBottom: "16px",
        }}
      >
        🍬
      </div>
      <p style={{ fontSize: "0.88rem", color: "var(--ink-400)" }}>
        No items in this category
      </p>
    </div>
  );
}