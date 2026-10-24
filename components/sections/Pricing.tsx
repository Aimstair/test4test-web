"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/primitives";
import { IconText } from "@/components/ui/Reward";
import { PLANS, playHref, type Plan } from "@/lib/content";

const ACCENT: Record<Plan["accent"], string> = {
  primary: "text-primary",
  warning: "text-warning",
  proplus: "text-proplus",
};

function Price({ value }: { value: number }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="inline-block tabular-nums"
      >
        {value === 0 ? "Free" : `$${Number.isInteger(value) ? value : value.toFixed(2)}`}
      </motion.span>
    </AnimatePresence>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<"monthly" | "weekly">("monthly");

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          label="Pricing"
          title={
            <>
              Free if you test. <span className="text-ink-3">Faster if you don&apos;t.</span>
            </>
          }
          sub={<IconText text="Most developers never pay: earn :token: by testing and publish with those. Upgrade only if you want to skip ahead." />}
        />

        <div className="mt-10 flex justify-center">
          <div className="relative inline-grid grid-cols-2 rounded-full border border-line bg-card p-1 text-sm font-semibold">
            {(["monthly", "weekly"] as const).map((c) => (
              <button key={c} onClick={() => setCycle(c)} className={`relative z-10 rounded-full px-5 py-2 capitalize ${cycle === c ? "text-card" : "text-ink-2"}`}>
                {cycle === c && <motion.span layoutId="cycle-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" />}
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-[28px] border bg-card p-7 ${
                p.highlight ? "border-primary shadow-[0_30px_60px_-30px_rgba(10,132,255,0.55)]" : "border-line"
              }`}
            >
              {p.highlight && (
                <span className="mono-label absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[10px] text-white">Start here</span>
              )}
              <p className={`mono-label text-xs ${ACCENT[p.accent]}`}>{p.name}</p>
              <p className="mt-1 text-ink-2">{p.tagline}</p>
              <p className="mt-6 flex items-baseline gap-1 overflow-hidden text-5xl font-bold tracking-tight">
                <Price value={cycle === "monthly" ? p.monthly : p.weekly} />
                {p.monthly > 0 && <span className="text-base font-medium text-ink-2">/{cycle === "monthly" ? "mo" : "wk"}</span>}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px]">
                    <Check className={`mt-0.5 size-4 shrink-0 ${ACCENT[p.accent]}`} strokeWidth={3} />
                    <span>
                      <IconText text={f} />
                    </span>
                  </li>
                ))}
              </ul>
              <motion.a
                href={playHref(`pricing-${p.id}`)}
                target="_blank"
                rel="noopener"
                whileTap={{ scale: 0.97 }}
                className={`mt-8 rounded-2xl py-3.5 text-center font-semibold ${p.highlight ? "bg-primary text-white" : "bg-tag text-ink hover:bg-line"}`}
              >
                {p.monthly === 0 ? "Start free on Google Play" : `Get ${p.name} in the app`}
              </motion.a>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-3">
          Plans are purchased in the app through Google Play. Prices may vary by region.
        </p>
      </div>
    </section>
  );
}
