import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ChatProvider } from "@/components/chat/ChatContext";
import { DentalChatWidget } from "@/components/chat/DentalChatWidget";
import { SITE } from "@/lib/constants/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smile360dental.pk"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.descriptor,
  keywords: [
    "dental clinic Faisalabad",
    "cosmetic dentistry Faisalabad",
    "dental implants Faisalabad",
    "clear aligners Pakistan",
    "best dentist Gulberg",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://www.smile360dental.pk",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.descriptor,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.descriptor,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: SITE.name,
  description: SITE.descriptor,
  image: "https://www.smile360dental.pk/opengraph-image",
  telephone: SITE.phoneDisplay,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.addressLine1,
    addressLocality: SITE.city,
    addressCountry: "PK",
  },
  priceRange: "PKR 2,000 – PKR 800,000",
  openingHoursSpecification: SITE.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.time.split(" – ")[0] ?? "",
    closes: h.time.split(" – ")[1] ?? "",
  })),
  sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ChatProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="pb-24 lg:pb-0">{children}</main>
            <Footer />
            <MobileStickyCta />
            <DentalChatWidget />
          </SmoothScrollProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
