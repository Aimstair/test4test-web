"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/primitives";
import { FAQ } from "@/lib/content";
import { ease } from "@/lib/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader label="FAQ" title="Questions, answered." />
        <ul className="mt-12 flex flex-col gap-3">
          {FAQ.map((item, i) => {
            const on = open === i;
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`overflow-hidden rounded-3xl border bg-card transition-colors ${on ? "border-primary/40" : "border-line"}`}
              >
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold"
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "var(--primary)" : "var(--tag)", color: on ? "#fff" : "var(--text)" }}
                    className="grid size-8 shrink-0 place-items-center rounded-full"
                  >
                    <Plus className="size-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <p className="px-6 pb-6 text-ink-2">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
