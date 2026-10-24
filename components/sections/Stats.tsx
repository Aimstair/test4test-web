"use client";

import { motion } from "motion/react";
import { Avatar } from "@/components/app-ui/chrome";
import { CountUp } from "@/components/ui/primitives";
import { STATS } from "@/lib/content";

export function Stats() {
  return (
    <section className="px-5 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl rounded-[32px] border border-line bg-card px-6 py-10 sm:px-12"
      >
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-5xl font-bold tracking-tight sm:text-6xl">
                <CountUp to={s.value} />
                <span className="text-primary">{s.suffix}</span>
              </p>
              <p className="mono-label mt-3 text-[11px] text-ink-2">{s.label}</p>
              {i === 0 && (
                <div className="mt-4 flex -space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((a) => (
                    <motion.span
                      key={a}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + a * 0.06 }}
                    >
                      <Avatar i={a + 8} size={30} className="ring-2 ring-card" />
                    </motion.span>
                  ))}
                </div>
              )}
              {i === 1 && (
                <div className="mt-4 flex gap-1.5">
                  {["#34C759", "#FF9500", "#0A84FF", "#FF3B30", "#1C1C1E", "#248A3D"].map((c, a) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + a * 0.06, type: "spring" }}
                      className="size-[26px] rounded-[7px]"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              )}
              {i === 2 && (
                <div className="mt-5 h-2 w-40 overflow-hidden rounded-full bg-tag">
                  <motion.div
                    className="h-full rounded-full bg-success"
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
