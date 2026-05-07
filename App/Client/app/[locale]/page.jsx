import { getTranslations } from "next-intl/server";
import { getCategories, getMenuItems } from "../../lib/strapi";
import TopNavBar from "../../components/TopNavBar";
import MenuGrid from "../../components/MenuGrid";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });
  return { title: t("title") };
}

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
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
      }}
    >
      <TopNavBar />
      <MenuGrid items={items} categories={categories} />
    </div>
  );
}