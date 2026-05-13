// app/api/revalidate/route.js
// API Route — runs on the server only, never shipped to the browser.
//
// Strapi calls this endpoint via a webhook after any content change
// (menu item updated, category added, price changed, etc.).
//
// It calls revalidateTag("menu") which purges every fetch() response that
// was tagged "menu" in lib/strapi.js — covering sections, categories, and
// items across all locales in one shot.
//
// Protected by a secret token so random callers can't bust your cache.
// Set REVALIDATE_SECRET in your Vercel environment variables, and add the
// same value to the Strapi webhook URL:
//   https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET
//
// Strapi webhook setup:
//   Settings → Webhooks → Add webhook
//   URL: https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET
//   Events: check all entry events (create, update, delete, publish, unpublish)
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { message: "Invalid secret" },
            { status: 401 }
        );
    }

    revalidateTag("menu");

    return NextResponse.json({
        revalidated: true,
        tag: "menu",
        timestamp: new Date().toISOString(),
    });
}