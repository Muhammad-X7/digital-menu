// app/[locale]/layout.jsx
// Server Component — no "use client".
// Provides locale context to the entire subtree via NextIntlClientProvider.
// Switching to a new locale re-renders only this layout and its children on
// the server; the client bundle stays lean.
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import "../globals.css";

export const metadata = {
    title: "Jiggly Cake",
    description: "Jiggly Cake — Japanese cheesecake, soft as silk.",
    openGraph: {
        title: "Jiggly Cake",
        description: "Jiggly Cake — Japanese cheesecake, soft as silk.",
        url: "https://digital-menu-swart.vercel.app",
        siteName: "Jiggly Cake",
        images: [
            {
                url: "https://digital-menu-swart.vercel.app/assets/logo.jpg",
                width: 1200,
                height: 630,
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jiggly Cake",
        description: "Jiggly Cake — Japanese cheesecake, soft as silk.",
        images: ["https://digital-menu-swart.vercel.app/assets/logo.jpg"],
    },
};

// Pre-generate all locale routes at build time.
export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    if (!locales.includes(locale)) notFound();

    // getMessages() reads from the messages/<locale>.json file on the server.
    // Passing the messages object to NextIntlClientProvider is required so
    // that "use client" components (LanguageSwitcher, CategoryItemsGrid, etc.)
    // can call useTranslations() without a separate network request.
    const messages = await getMessages();
    const isRtl = locale === "ar" || locale === "ckb";

    return (
        <html
            lang={locale}
            dir={isRtl ? "rtl" : "ltr"}
            data-scroll-behavior="smooth"
        >
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}