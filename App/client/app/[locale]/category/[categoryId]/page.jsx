import { notFound } from "next/navigation";
import { getMenuItems, getCategories } from "../../../../lib/strapi";
import TopNavBar from "../../../../components/TopNavBar";
import CategoryItemsGrid from "../../../../components/CategoryItemsGrid";
import { locales } from "../../../../i18n";

export async function generateStaticParams() {
    const params = [];
    for (const locale of locales) {
        try {
            const categories = await getCategories(locale);
            for (const cat of categories) {
                params.push({ locale, categoryId: cat.documentId });
            }
        } catch (err) {
            console.error(`generateStaticParams failed for locale ${locale}:`, err);
        }
    }
    return params;
}

export async function generateMetadata({ params }) {
    const { locale, categoryId } = await params;
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

    let items = [];
    let categoryName = "";

    try {
        const [allItems, categories] = await Promise.all([
            getMenuItems(locale),
            getCategories(locale),
        ]);

        const cat = categories.find((c) => c.documentId === categoryId);
        if (!cat) notFound();

        categoryName = cat.name;
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