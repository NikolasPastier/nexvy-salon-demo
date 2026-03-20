import type { Metadata } from "next";
import { Noto_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BookingModalProvider } from "@/context/BookingModalContext";
import BookingModal, { Toast } from "@/components/BookingModal";
import config from "../../content/site-config.json";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bella Studio | Prémiový kadernícky salón Bratislava",
    template: "%s | Bella Studio",
  },
  description:
    "Prémiový kadernícky salón v centre Bratislavy. Strih, farbenie, balayage, svadobné účesy. Objednajte sa online.",
  keywords: ["kadernícky salón", "Bratislava", "balayage", "strih", "farbenie", "kaderníctvo"],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: "Bella Studio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: config.business.name,
  description: config.business.description,
  url: "https://bellastudio.sk",
  telephone: config.business.contacts.phone,
  email: config.business.contacts.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Obchodná 12",
    postalCode: "811 06",
    addressLocality: "Bratislava",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.149,
    longitude: 17.1084,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(config.business.rating),
    reviewCount: String(config.business.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    config.business.contacts.instagram,
    config.business.contacts.facebook,
    config.business.contacts.google,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sk"
      className={`${notoSerif.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <BookingModalProvider>
          {children}
          <BookingModal />
          <Toast />
        </BookingModalProvider>
      </body>
    </html>
  );
}
