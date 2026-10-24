import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { PlayBadge } from "@/components/ui/PlayBadge";
import { Reveal } from "@/components/ui/primitives";
import { GUIDES, type Guide } from "@/lib/guides";
import { articleLd, breadcrumbLd, faqLd, graph, howToLd, organizationLd, websiteLd } from "@/lib/seo";

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

/** Long-form, answer-first landing page used by every topic-cluster route. */
export function GuideArticle({ guide }: { guide: Guide }) {
  const path = `/${guide.slug}`;
  const howToSection = guide.howTo && guide.sections.find((s) => s.id === guide.howTo!.section);
  const related = guide.related.map((s) => GUIDES.find((g) => g.slug === s)!).filter(Boolean);
  const ld = graph(
    organizationLd(),
    websiteLd(),
    articleLd({ title: guide.h1, description: guide.description, path, datePublished: guide.datePublished, dateModified: guide.dateModified }),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: guide.eyebrow, path },
    ]),
    faqLd(guide.faq),
    ...(howToSection?.steps ? [howToLd(guide.howTo!.name, howToSection.steps, guide.howTo!.totalTime)] : []),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Nav home={false} />
      <main className="px-5 pb-10 pt-28 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-2">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-ink">{guide.eyebrow}</span>
          </nav>

          <header className="mt-6">
            <span className="mono-label rounded-full border border-line bg-card px-3 py-1.5 text-[11px] text-primary">[ {guide.eyebrow} ]</span>
            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">{guide.h1}</h1>
            <p className="mt-4 text-sm text-ink-2">
              By Test4Test · Updated <time dateTime={guide.dateModified}>{fmtDate(guide.dateModified)}</time>
            </p>
          </header>

          {/* answer-first block for featured snippets and AI answers */}
          <section aria-label="Quick answer" className="mt-8 rounded-3xl border border-primary/30 bg-card p-6 sm:p-7">
            <p className="mono-label text-[11px] text-primary">Quick answer</p>
            <p className="mt-3 text-lg leading-relaxed">{guide.answer}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PlayBadge placement={`guide-${guide.slug}-top`} />
              <Link href="/#how" className="inline-flex items-center gap-1.5 font-semibold text-ink-2 hover:text-ink">
                See how it works <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>

          <section aria-label="Key facts" className="mt-8">
            <h2 className="sr-only">Key facts</h2>
            <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-card sm:grid-cols-3">
              {guide.facts.map((f) => (
                <div key={f.label} className="border-b border-r border-line p-4 last:border-r-0">
                  <dt className="mono-label text-[10px] text-ink-2">{f.label}</dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* table of contents */}
          <nav aria-label="On this page" className="mt-10 rounded-3xl border border-line bg-card p-6">
            <p className="mono-label text-[11px] text-ink-2">On this page</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {guide.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 text-ink-2 hover:text-primary">
                    <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {s.h2}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="flex gap-2 text-ink-2 hover:text-primary">
                  <span className="font-mono text-primary">{String(guide.sections.length + 1).padStart(2, "0")}</span>
                  Frequently asked questions
                </a>
              </li>
            </ol>
          </nav>

          {guide.sections.map((s) => (
            <Reveal as="section" key={s.id} className="mt-14 scroll-mt-28">
              <h2 id={s.id} className="scroll-mt-28 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                {s.h2}
              </h2>
              {s.paras.map((p, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 flex flex-col gap-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-lg">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.steps && (
                <ol className="mt-6 flex flex-col gap-3">
                  {s.steps.map((st, i) => (
                    <li key={st.title} className="flex gap-4 rounded-2xl border border-line bg-card p-5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-mono text-sm font-bold text-white">{i + 1}</span>
                      <div>
                        <h3 className="font-bold">{st.title}</h3>
                        <p className="mt-1 text-ink-2">{st.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </Reveal>
          ))}

          <section className="mt-14 rounded-[32px] border border-line bg-card p-8 text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">Get your first testers today</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-2">
              Join 1,000+ Android developers testing each other&apos;s apps. Free with tokens you earn by testing.
            </p>
            <div className="mt-6 flex justify-center">
              <PlayBadge placement={`guide-${guide.slug}-bottom`} size="lg" />
            </div>
          </section>

          <section className="mt-14">
            <h2 id="faq" className="scroll-mt-28 text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {guide.faq.map((f) => (
                <details key={f.q} className="group rounded-3xl border border-line bg-card px-6 py-5 open:border-primary/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    <h3>{f.q}</h3>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-tag text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-xl font-bold">Related guides</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={`/${g.slug}`} className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-primary/40">
                    <span className="mono-label text-[10px] text-primary">{g.eyebrow}</span>
                    <span className="mt-2 font-semibold">{g.h1}</span>
                    <span className="mt-auto flex items-center gap-1 pt-3 text-sm text-ink-2">
                      Read guide <ArrowRight className="size-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
