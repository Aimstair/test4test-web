import type { Metadata } from "next";
import { APP_NAME, COMPANY, PACKAGE_ID, PLAY_URL, SITE_URL, SUPPORT_EMAIL } from "./content";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: APP_NAME, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ---------- JSON-LD builders (schema.org) ----------

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#app`;

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY,
    url: SITE_URL,
    logo: absoluteUrl("/icon.jpg"),
    email: SUPPORT_EMAIL,
    sameAs: [PLAY_URL],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: APP_NAME,
    alternateName: ["Test 4 Test", "Test for Test"],
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function appLd(offers: { name: string; price: number }[]) {
  return {
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: APP_NAME,
    alternateName: "Test4Test - Get App Testers",
    operatingSystem: "Android",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "App testing",
    downloadUrl: PLAY_URL,
    installUrl: PLAY_URL,
    url: SITE_URL,
    identifier: PACKAGE_ID,
    image: absoluteUrl("/icon.jpg"),
    publisher: { "@id": ORG_ID },
    description:
      "Test4Test is a test-for-test community where Android developers get 20+ active, verified testers for Google Play closed testing. Test other apps to earn tokens, spend them to get testers for your own app, and track 14 days of daily screenshot proof.",
    featureList: [
      "Get 20+ Google Play testers in about 24 hours",
      "Verified 14-day retention with daily screenshot proof",
      "One shared Google Group for Play Console, no personal emails exchanged",
      "Earn free tokens by testing other developers' apps",
      "Developer Studio dashboard with locked testers, daily activity and churn",
      "Honest tester feedback and bug reports",
    ],
    offers: offers.map((o) => ({ "@type": "Offer", name: o.name, price: o.price, priceCurrency: "USD" })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function howToLd(name: string, steps: { title: string; text: string }[], totalTime?: string) {
  return {
    "@type": "HowTo",
    name,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };
}

export function articleLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    image: absoluteUrl("/opengraph-image"),
    about: { "@id": APP_ID },
  };
}

/** Wraps nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
