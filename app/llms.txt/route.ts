import { FAQ, GOOGLE_GROUP_EMAIL, PLAY_URL } from "@/lib/content";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt (https://llmstxt.org): a plain-text brief for AI answer engines.
export function GET() {
  const body = `# Test4Test

> Test4Test is an Android app (Google Play: ${PLAY_URL}) where app developers get 20+ active, verified testers for Google Play closed testing. Developers test each other's apps ("test for test"), earn tokens for every app they test, and spend tokens to get testers for their own app. It is free to use with earned tokens; optional Pro and Pro+ plans exist.

Key facts:
- Google Play requires new personal developer accounts (created after Nov 13, 2023) to run a closed test with at least 12 opted-in testers for 14 consecutive days before applying for production access. The minimum was 20 testers until December 2024.
- Test4Test listings target 20+ testers and usually fill within about 24 hours.
- Testers join one shared Google Group (${GOOGLE_GROUP_EMAIL}); developers add that single address to their Play Console closed testing track.
- Every tester uploads a screenshot taken that day, every day, for 14 days. Photo dates are checked automatically and developers approve or flag each proof.
- Karma is a reputation score: +1 per approved daily check-in, -2 per missed day.
- A Basic listing costs 80 tokens. Referrals give +50 tokens to both people.
- Community: 1,000+ active testers, 800+ apps listed, 98% production rate.
- Android only. Publisher: Aimtera Labs.

## Guides
${GUIDES.map((g) => `- [${g.h1}](${absoluteUrl(`/${g.slug}`)}): ${g.description}`).join("\n")}

## FAQ
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Links
- [Homepage](${absoluteUrl("/")})
- [Download on Google Play](${PLAY_URL})
- [Privacy policy](${absoluteUrl("/privacy")})
- [Terms of service](${absoluteUrl("/terms")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
