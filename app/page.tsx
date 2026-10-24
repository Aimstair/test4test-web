import { Economy } from "@/components/sections/Economy";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MobileCtaBar } from "@/components/sections/MobileCtaBar";
import { Nav } from "@/components/sections/Nav";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Roles } from "@/components/sections/Roles";
import { Stats } from "@/components/sections/Stats";
import { Guides } from "@/components/sections/Guides";
import { FAQ, PLANS } from "@/lib/content";
import { appLd, faqLd, graph, howToLd, organizationLd, websiteLd } from "@/lib/seo";

const jsonLd = graph(
  organizationLd(),
  websiteLd(),
  appLd(PLANS.map((p) => ({ name: p.name, price: p.monthly }))),
  faqLd(FAQ),
  howToLd(
    "How to get Google Play testers with Test4Test",
    [
      { title: "List your app", text: "Add your app, pick a tier and region, and add the Test4Test Google Group to your Play Console closed testing track." },
      { title: "Testers lock in", text: "Developers from the Catalog claim a slot and commit to testing your app for 14 days." },
      { title: "Daily verified proof", text: "Every day testers open your app and upload a dated screenshot that you approve in the Verify tab." },
      { title: "Graduate to production", text: "After 14 verified days your closed test is complete and you can apply for production access." },
    ],
    "P14D",
  ),
);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <HowItWorks />
        <Roles />
        <Economy />
        <Features />
        <Pricing />
        <Guides />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
