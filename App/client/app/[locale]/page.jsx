import { getCategories, getMenuItems } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

export const revalidate = 60;

export default async function MenuPage({ params }) {
    const { locale } = await params;

    let categories = [];
    let items = [];

    try {
        [categories, items] = await Promise.all([
            getCategories(locale),
            getMenuItems(locale),
        ]);
    } catch (err) {
        console.error("Failed to fetch menu data:", err);
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <TopNavBar />
            <MenuGrid items={items} categories={categories} />
        </div>
    );
}