// Single place to edit copy, links and numbers used across the landing page.

export const APP_NAME = "Test4Test";
export const COMPANY = "Aimtera Labs";
export const PACKAGE_ID = "com.aimteralabs.test4test";
export const PLAY_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_ID}`;

export const SUPPORT_EMAIL = "aimteralabs@gmail.com";
export const GOOGLE_GROUP_EMAIL = "test4test-community@googlegroups.com";

// Canonical origin used for canonical URLs, sitemap and structured data.
// Override with NEXT_PUBLIC_SITE_URL if the domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://test4test.live").replace(/\/$/, "");

/**
 * Play Store link with install attribution. Google Play forwards the
 * `referrer` param to Play Console acquisition reports, so each CTA
 * placement can be compared.
 */
export function playHref(placement: string) {
  const referrer = `utm_source=landing&utm_medium=web&utm_campaign=site&utm_content=${placement}`;
  return `${PLAY_URL}&referrer=${encodeURIComponent(referrer)}`;
}

export const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#earn", label: "Earn tokens" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

// Community numbers shown right after the hero.
export const STATS = [
  { value: 1000, suffix: "+", label: "Active testers" },
  { value: 800, suffix: "+", label: "Apps listed" },
  { value: 98, suffix: "%", label: "Production rate" },
];

export const ECONOMY = {
  tokensPerTest: 20,
  karmaPerCheckIn: 1,
  karmaPerMiss: -2,
  basicListingCost: 80,
  referralBonus: 50,
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  weekly: number;
  features: string[];
  accent: "primary" | "warning" | "proplus";
  highlight?: boolean;
};

// Fallback prices from the app's pricing screen; live prices come from Google Play.
export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Test to earn, publish for free",
    monthly: 0,
    weekly: 0,
    accent: "primary",
    highlight: true,
    features: [
      "Earn :token: by testing other apps",
      "List your app with earned :token:",
      "Verified 14-day daily proofs",
      "Developer Studio dashboard",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For devs shipping regularly",
    monthly: 3.99,
    weekly: 2.49,
    accent: "warning",
    features: [
      "Everything in Basic",
      "50% off every listing",
      "More testers per app",
      "Auto-approve daily proofs",
      "+100 :karma: bonus",
    ],
  },
  {
    id: "proplus",
    name: "Pro+",
    tagline: "Maximum reach, zero listing cost",
    monthly: 10,
    weekly: 5,
    accent: "proplus",
    features: [
      "Everything in Pro",
      "Free listings",
      "Highest tester capacity",
      "Dedicated support",
      "+200 :karma: bonus",
    ],
  },
];

export const FAQ = [
  {
    q: "How many testers do I need for Google Play?",
    a: "New personal developer accounts must run a closed test with at least 12 opted-in testers for 14 consecutive days before they can apply for production access (Google lowered the requirement from 20 testers in December 2024). Test4Test listings reach 20+ active testers so you stay above the minimum even if someone drops out.",
  },
  {
    q: "Where can I find testers for my Android app?",
    a: "Test4Test is a community of Android developers who test each other's apps. List your app, and testers from the Catalog claim a slot, install it through your closed testing track and use it daily for 14 days. Most listings fill their slots within about 24 hours.",
  },
  {
    q: "What is test for test?",
    a: "Test for test is a reciprocal arrangement: you test other developers' apps and they test yours. Test4Test turns it into a fair system with tokens. Every app you test earns tokens, and you spend tokens to get testers for your own app.",
  },
  {
    q: "Can I get app testers for free?",
    a: "Yes. Test other developers' apps to earn tokens, then spend those tokens to publish your own listing. A Basic listing costs 80 tokens, which you can earn by testing a handful of apps. Pro and Pro+ plans are optional if you'd rather skip the testing.",
  },
  {
    q: "How do testers get access to my closed test?",
    a: `Every tester joins one shared Google Group (${GOOGLE_GROUP_EMAIL}). You add that single address to your Play Console closed testing track once, and every Test4Test tester can opt in and install your app. Nobody's personal email is exposed.`,
  },
  {
    q: "How do you make sure testers stay for all 14 days?",
    a: "Testers commit to a 14-day contract. Each day they open your app and upload a screenshot taken that day. The photo's date is checked automatically, and you can approve or flag each proof from the Verify tab. Missing a day costs testers Karma, so reliable testers rise to the top.",
  },
  {
    q: "What counts as a valid daily proof?",
    a: "Your app must be visibly open, the status bar must show today's date or time, and the screenshot can't be a home screen or a duplicate. Proofs that aren't from today are rejected automatically.",
  },
  {
    q: "What are Tokens and Karma?",
    a: "Tokens are the in-app currency: you earn them by testing apps, reviewing and inviting friends, and spend them to publish listings or boost them. Karma is your reputation: +1 for every approved daily check-in, -2 for every missed day.",
  },
  {
    q: "Is Test4Test only for Android?",
    a: "Yes. It's built specifically around Google Play's closed testing requirement, so both testers and developers need an Android device.",
  },
  {
    q: "Does using Test4Test guarantee production approval?",
    a: "No service can guarantee Google's decision. Test4Test gets you real, active, verified testers for the full 14 days, which is the part of the process you control.",
  },
];
