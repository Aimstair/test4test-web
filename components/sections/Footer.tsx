import Link from "next/link";
import { COMPANY, PLAY_URL, SUPPORT_EMAIL } from "@/lib/content";
import { GUIDES } from "@/lib/guides";
import { Wordmark } from "./Nav";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pb-28 pt-14 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_0.8fr]">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-ink-2">
            Accountable peer testing for Android developers. Get 20+ Google Play testers for your closed test.
          </p>
        </div>
        <nav aria-label="Guides">
          <p className="mono-label text-[11px] text-ink">Guides</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/${g.slug}`} className="hover:text-ink">
                  {g.eyebrow === "Guide" ? "Google Play closed testing guide" : g.eyebrow}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="mono-label text-[11px] text-ink">Test4Test</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-2">
            <li>
              <a href={PLAY_URL} target="_blank" rel="noopener" className="hover:text-ink">
                Get it on Google Play
              </a>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-ink">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ink">
                Terms
              </Link>
            </li>
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink-3">
        © {new Date().getFullYear()} {COMPANY}. Google Play and the Google Play logo are trademarks of Google LLC. Test4Test is not affiliated with Google.
      </p>
    </footer>
  );
}
