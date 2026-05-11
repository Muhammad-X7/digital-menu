import { Suspense } from "react";
import { getCategories, getSections } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

export const revalidate = 60;

// MenuGrid uses useSearchParams() which requires a Suspense boundary in
// Next.js App Router. Wrapping it here avoids the static generation bailout.
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
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <TopNavBar />
            <Suspense>
                <MenuGrid categories={categories} sections={sections} />
            </Suspense>
        </div>
    );
}