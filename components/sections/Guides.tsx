import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, SectionHeader } from "@/components/ui/primitives";
import { GUIDES } from "@/lib/guides";

/** Homepage hub linking to every topic-cluster page (internal links + anchor text). */
export function Guides() {
  return (
    <section id="guides" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          label="Guides"
          title="Everything about finding app testers"
          sub="Straight answers on Google Play testers, the 12-tester rule, free testers and how test for test works."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={i * 0.05} className={i === GUIDES.length - 1 ? "lg:col-span-2" : ""}>
              <Link
                href={`/${g.slug}`}
                className="group flex h-full flex-col rounded-[28px] border border-line bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="mono-label text-[10px] text-primary">{g.eyebrow}</span>
                <h3 className="mt-3 text-xl font-bold leading-snug">{g.h1}</h3>
                <p className="mt-2 line-clamp-3 text-ink-2">{g.description}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink-2 group-hover:text-primary">
                  Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
