import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Noto_Sans_Arabic, Playfair_Display } from "next/font/google";
import { locales } from "../../i18n";
import "../globals.css";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  const isRtl = locale === "ar" || locale === "ckb";
  const dir = isRtl ? "rtl" : "ltr";
  const fontClass = isRtl ? notoArabic.variable : playfair.variable;

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontClass} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className={isRtl ? "font-arabic" : "font-latin"}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}