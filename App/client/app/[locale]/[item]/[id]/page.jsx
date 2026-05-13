import { notFound } from "next/navigation";
import { getMenuItem } from "../../../../lib/strapi";
import TopNavBar from "../../../../components/TopNavBar";
import { locales } from "../../../../i18n";

// force-static: built once at deploy, served from CDN cache until the
// /api/revalidate webhook fires revalidateTag("menu").
export const dynamic = "force-static";

// generateStaticParams tells Next.js every [locale]/[id] combination to
// pre-render at build time — required for force-static on dynamic routes.
// Note: this page appears unused in the current UI (items open in a modal,
// not their own page), but it's here for completeness and direct-link support.
export async function generateStaticParams() {
    // Items are fetched per-locale in the category page already.
    // Since getMenuItem requires a known id, and we don't have a getMenuItems
    // call here, we return an empty array — Next.js will still statically render
    // any route that is actually visited, falling back to on-demand generation.
    return [];
}

export async function generateMetadata({ params }) {
    const { locale, id } = await params;
    try {
        const item = await getMenuItem(id, locale);
        if (!item) return { title: "Item Not Found" };
        return { title: item.name };
    } catch {
        return { title: "Menu Item" };
    }
}

export default async function ItemPage({ params }) {
    const { locale, id } = await params;

    let item = null;

    try {
        item = await getMenuItem(id, locale);
    } catch (err) {
        console.error("Failed to fetch item:", err);
    }

    if (!item) notFound();

    return (
        <div className="min-h-screen">
            <TopNavBar />
        </div>
    );
}