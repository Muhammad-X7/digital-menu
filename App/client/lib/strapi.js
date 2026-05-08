const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Fetches data from Strapi REST API with 60-second revalidation.
 */
async function fetchStrapi(path, params = {}) {
  const url = new URL(`${STRAPI_URL}/api${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json();
}

/**
 * Fetches all categories for a given locale.
 */
export async function getCategories(locale) {
  const data = await fetchStrapi("/categories", {
    locale,
    "pagination[pageSize]": 100,
    "fields[0]": "name",
    "fields[1]": "slug",
    "fields[2]": "description",
    "populate[0]": "image",
    "sort": "order:asc",           // ← added
  });

  return (data.data || []).map((item) => {
    const attrs = item.attributes ?? item;

    const imageData = attrs.image?.data ?? attrs.image;
    const imageAttrs = imageData?.attributes ?? imageData;
    const imageUrl = imageAttrs?.url
      ? imageAttrs.url.startsWith("http")
        ? imageAttrs.url
        : `${STRAPI_URL}${imageAttrs.url}`
      : null;

    return {
      id: item.id,
      name: attrs.name ?? item.name,
      slug: attrs.slug ?? item.slug,
      description: attrs.description ?? null,
      imageUrl,
    };
  });
}

/**
 * Fetches all available menu items for a given locale.
 * Items where isAvailable is false are filtered out.
 */
export async function getMenuItems(locale) {
  const data = await fetchStrapi("/menu-items", {
    locale,
    "filters[isAvailable][$eq]": "true",
    "populate[0]": "image",
    "populate[1]": "category",
    "pagination[pageSize]": 200,
    "sort": "order:asc",           // ← added
  });

  return (data.data || []).map(normalizeMenuItem);
}

/**
 * Fetches a single menu item by documentId for a given locale.
 * Strapi v5 uses documentId (string) for single-resource lookups,
 * not the numeric id used in list responses.
 */
export async function getMenuItem(id, locale) {
  const data = await fetchStrapi(`/menu-items/${id}`, {
    locale,
    "populate[0]": "image",
    "populate[1]": "category",
  });

  if (!data.data) return null;
  return normalizeMenuItem(data.data);
}

/**
 * Normalizes a Strapi item response (handles both v4 and v5 shapes).
 */
function normalizeMenuItem(item) {
  const attrs = item.attributes ?? item;

  const imageData = attrs.image?.data ?? attrs.image;
  const imageAttrs = imageData?.attributes ?? imageData;
  const imageUrl = imageAttrs?.url
    ? imageAttrs.url.startsWith("http")
      ? imageAttrs.url
      : `${STRAPI_URL}${imageAttrs.url}`
    : null;

  const categoryData = attrs.category?.data ?? attrs.category;
  const categoryAttrs = categoryData?.attributes ?? categoryData;

  return {
    id: item.documentId ?? item.id,
    numericId: item.id,
    name: attrs.name,
    description: attrs.description,
    price: attrs.price,
    isAvailable: attrs.isAvailable ?? true,
    imageUrl,
    imageAlt: imageAttrs?.alternativeText || attrs.name,
    categoryId: categoryData?.id ?? null,
    categoryName: categoryAttrs?.name ?? null,
    categorySlug: categoryAttrs?.slug ?? null,
  };
}