"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";
import MenuCard from "./MenuCard";

export default function MenuGrid({ items, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? items.filter((item) => item.categoryId === activeCategory)
    : items;

  return (
    <>
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <main
        className="max-w-2xl mx-auto px-5"
        style={{ paddingTop: "28px", paddingBottom: "60px" }}
      >
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="menu-grid">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        .menu-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 480px) {
          .menu-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 720px) {
          .menu-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
        }
      `}</style>
    </>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
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