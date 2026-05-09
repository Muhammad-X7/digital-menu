import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import "../globals.css";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
    const { locale } = await params;

    if (!locales.includes(locale)) notFound();

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