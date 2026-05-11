import { notFound } from "next/navigation";
import { getMenuItems, getCategories } from "../../../../lib/strapi";
import TopNavBar from "../../../../components/TopNavBar";
import CategoryItemsGrid from "../../../../components/CategoryItemsGrid";

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { locale, categoryId } = await params;
    // categoryId is a documentId string — stable across all locales
    try {
        const categories = await getCategories(locale);
        const cat = categories.find((c) => c.documentId === categoryId);
        if (!cat) return { title: "Category Not Found" };
        return { title: `${cat.name} — Jiggly Cake` };
    } catch {
        return { title: "Jiggly Cake" };
    }
}

export default async function CategoryPage({ params }) {
    const { locale, categoryId } = await params;
    // categoryId is a documentId string (e.g. "abc123xyz"), NOT a numeric id.
    // The same documentId resolves to the correct locale-specific entry in Strapi,
    // so /en/category/abc123xyz and /ckb/category/abc123xyz both work correctly.

    let items = [];
    let categoryName = "";

    try {
        const [allItems, categories] = await Promise.all([
            getMenuItems(locale),
            getCategories(locale),
        ]);

        // Match by documentId (locale-stable) not by numeric id (locale-specific)
        const cat = categories.find((c) => c.documentId === categoryId);
        if (!cat) notFound();

        categoryName = cat.name;
        // Filter items using the locale-specific numeric id of the matched category,
        // since menu items store categoryId as the numeric relation id.
        items = allItems.filter((i) => i.categoryId === cat.id);
    } catch (err) {
        console.error("Failed to fetch category page data:", err);
        notFound();
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <TopNavBar />
            <CategoryItemsGrid
                items={items}
                categoryName={categoryName}
                locale={locale}
            />
        </div>
    );
}