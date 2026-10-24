import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Roboto, Roboto_Mono } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Roboto / Roboto Mono reproduce the Android app's system fonts inside the phone replicas
// (not preloaded: they only render inside the phone mockups, never the LCP text)
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], preload: false });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"], weight: ["400", "600", "700"], preload: false });

const title = "Get 20+ Google Play Testers in 24h, Free | Test4Test";
const description =
  "Get 20+ real app testers for your Google Play closed test in 24 hours. Test for test: earn free tokens testing other apps, get testers verified for 14 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s" },
  description,
  applicationName: "Test4Test",
  keywords: [
    "app testers",
    "google play testers",
    "test for test",
    "mobile app testers",
    "free testers",
    "free app testers",
    "android app testers",
    "12 testers 14 days",
    "20 testers 14 days",
    "google play closed testing",
    "beta testers",
    "test4test",
  ],
  authors: [{ name: "Aimtera Labs" }],
  creator: "Aimtera Labs",
  publisher: "Aimtera Labs",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: { title, description, type: "website", siteName: "Test4Test", url: "/", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false, email: false, address: false },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION after adding the site to Search Console / Bing Webmaster Tools.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  other: { "google-play-app": "app-id=com.aimteralabs.test4test" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F4F6" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Sets data-theme before paint to avoid a light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${robotoMono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
