// app/[locale]/page.jsx
// Server Component — no "use client".
//
// All data fetching happens here so MenuGrid and TopNavBar receive
// pre-fetched props rather than triggering their own Strapi calls.
// The page is statically generated at build time and revalidated
// on-demand via revalidateTag("menu") from the /api/revalidate webhook.
import { getCategories, getSections } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

export default async function MenuPage({ params }) {
    const { locale } = await params;

    let categories = [];
    let sections = [];

    try {
        [sections, categories] = await Promise.all([
            getSections(locale),
            getCategories(locale),
        ]);
    } catch (err) {
        console.error("Failed to fetch menu data:", err);
        // Render empty state rather than crash — MenuGrid handles empty arrays.
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <TopNavBar />
            <MenuGrid
                categories={categories}
                sections={sections}
                locale={locale}
            />
        </div>
    );
}