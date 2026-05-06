import { notFound } from "next/navigation";
import { getMenuItem } from "../../../../lib/strapi";
import TopNavBar from "../../../../components/TopNavBar";
import ItemDetail from "../../../../components/ItemDetail";

export const revalidate = 60;

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
      <ItemDetail item={item} />
    </div>
  );
}
