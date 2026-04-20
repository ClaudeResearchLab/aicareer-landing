import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roslindale = localFont({
  src: [
    {
      path: "../../public/fonts/roslindale/RoslindaleDisplayNarrow-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/roslindale/RoslindaleDisplayNarrow-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/roslindale/RoslindaleDisplayNarrow-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/roslindale/RoslindaleDisplayNarrow-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display-local",
  display: "swap",
  preload: true,
});

const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/manrope/Manrope-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope/Manrope-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body-local",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ellipsus.com"),
  title: "Ellipsus | Collaborative writing software",
  description:
    "Write, edit, and collaborate on any device. Ellipsus is a principled alternative to Google Docs—built for writers, by writers. Sign up for free.",
  icons: {
    icon: [
      { url: "/seo/favicon.ico", sizes: "any" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/seo/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/seo/safari-pinned-tab.svg", color: "#282825" },
    ],
  },
  manifest: "/seo/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://ellipsus.com/",
    title: "Ellipsus | Collaborative writing software",
    description:
      "Write, edit, and collaborate on any device. Ellipsus is a principled alternative to Google Docs—built for writers, by writers. Sign up for free.",
    images: [{ url: "/seo/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ellipsus_write",
    title: "Ellipsus | Collaborative writing software",
    description:
      "Write, edit, and collaborate on any device. Ellipsus is a principled alternative to Google Docs—built for writers, by writers. Sign up for free.",
    images: ["/seo/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ellipsus.com/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roslindale.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
