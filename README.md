# Test4Test landing page

Marketing site for the [Test4Test Android app](https://play.google.com/store/apps/details?id=com.aimteralabs.test4test).
Next.js (App Router, static export) + Tailwind CSS v4 + Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out (deploy to Vercel or any static host)
```

## Where things live

- `lib/content.ts`: all copy, stats, prices, FAQ, Play Store link and support email
- `components/app-ui/`: HTML replicas of the app's screens (top bar, catalog cards, streak bar, studio, etc.)
- `components/sections/`: page scenes (Hero, Problem, HowItWorks, Roles, Economy, Features, Pricing, Faq, FinalCta)
- `app/privacy`, `app/terms`: legal pages (drafts, review before launch)

Every Play Store CTA carries a `referrer` with `utm_content=<placement>`, so Play Console acquisition reports show which section converts.

## SEO / AEO

- Topic-cluster pages live in `lib/guides.ts` (one page per search intent, rendered by `app/[slug]`). Add a guide there and it gets its route, metadata, JSON-LD, sitemap entry, homepage card and footer link automatically.
- Generated: `/sitemap.xml`, `/robots.txt` (AI crawlers explicitly allowed), `/llms.txt`, `/manifest.webmanifest`, OG image.
- Structured data (`lib/seo.ts`): Organization, WebSite, MobileApplication, FAQPage, HowTo, Article, BreadcrumbList.

## Before launch

- Production domain is https://test4test.live (override with `NEXT_PUBLIC_SITE_URL`)
- Set `SUPPORT_EMAIL` in `lib/content.ts`
- Review `/privacy` and `/terms`
- Verify the domain in Google Search Console and Bing Webmaster Tools (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`) and submit `/sitemap.xml`
- Link the website from the Play Store listing (Store settings → Website)
