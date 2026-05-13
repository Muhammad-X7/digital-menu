import { getCategories, getSections } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

// force-static: Next.js builds this page once at deploy time and serves it as
// a pure static file. No server computation per request — as fast as a CDN can
// physically deliver a file. The cache is only invalidated when Strapi fires
// the webhook at /api/revalidate, which calls revalidateTag("menu").
export const dynamic = "force-static";

export default async function MenuPage({ params, searchParams }) {
    const { locale } = await params;
    const { section } = await searchParams;
    const activeSection = section ?? null;

    let categories = [];
    let sections = [];

    try {
        [sections, categories] = await Promise.all([
            getSections(locale),
            getCategories(locale),
        ]);
    } catch (err) {
        console.error("Failed to fetch menu data:", err);
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <TopNavBar />
            <MenuGrid
                categories={categories}
                sections={sections}
                activeSection={activeSection}
            />
        </div>
    );
}