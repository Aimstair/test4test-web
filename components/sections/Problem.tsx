"use client";

import { RotateCcw, ShieldCheck, UserX } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { StreakBar } from "@/components/app-ui/cards";
import { Avatar } from "@/components/app-ui/chrome";
import { SectionHeader } from "@/components/ui/primitives";

const TESTERS = 20;
// Day on which each "friends & family" tester quietly uninstalls (0 = never)
const DROP_DAY = [0, 3, 0, 0, 5, 0, 7, 0, 0, 4, 0, 8, 0, 0, 6, 0, 8, 0, 2, 7];
const RESET_DAY = 9;

function Tester({ i, gone, checked }: { i: number; gone: boolean; checked?: boolean }) {
  return (
    <motion.span
      animate={{
        opacity: gone ? 0.25 : 1,
        scale: gone ? 0.8 : checked ? [1, 1.15, 1] : 1,
        filter: gone ? "grayscale(1)" : "grayscale(0)",
      }}
      transition={{ duration: 0.4 }}
      className="relative block aspect-square"
    >
      <Avatar i={i} size={64} className="!size-full" />
      {gone && (
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-danger text-white">
          <UserX className="size-2.5" />
        </motion.span>
      )}
    </motion.span>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [day, setDay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setDay((d) => (d >= 18 ? 0 : d + 1)), 650);
    return () => clearInterval(id);
  }, [inView]);

  // left panel resets at RESET_DAY, right panel runs to 14 then holds
  const leftDay = Math.min(day, RESET_DAY);
  const resetting = day >= RESET_DAY;
  const active = DROP_DAY.filter((d) => d === 0 || d > leftDay).length;
  const rightDay = Math.min(day, 14);
  const graduated = day >= 14;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          label="The 14-day wall"
          title={
            <>
              Begging friends for testers <span className="text-ink-3">isn&apos;t a launch plan.</span>
            </>
          }
          sub="Friends install your app once and forget it. A few uninstalls later you're below the minimum, and the 14-day clock starts over."
        />

        <div ref={ref} className="mt-16 grid gap-5 md:grid-cols-2">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="mono-label text-[11px] text-danger">Without Test4Test</span>
              <span className="font-mono text-sm tabular-nums text-ink-2">Day {leftDay}/14</span>
            </div>
            <p className="mt-2 text-2xl font-bold">Friends &amp; family</p>
            <div className="mt-6 grid grid-cols-10 gap-2">
              {Array.from({ length: TESTERS }, (_, i) => (
                <Tester key={i} i={i} gone={DROP_DAY[i] !== 0 && DROP_DAY[i] <= leftDay} />
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="mono-label text-[10px] text-ink-2">Still testing</p>
                <motion.p
                  key={active}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-4xl font-bold tabular-nums ${active < 15 ? "text-danger" : ""}`}
                >
                  {active}
                  <span className="text-lg text-ink-3">/{TESTERS}</span>
                </motion.p>
              </div>
              <StreakBar done={leftDay} pulseCurrent={!resetting} className="w-1/2 [&>span]:h-3" />
            </div>
            <AnimatePresence>
              {resetting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-danger px-4 py-3 text-white shadow-lg"
                >
                  <motion.span animate={{ rotate: -360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
                    <RotateCcw className="size-5" />
                  </motion.span>
                  <span className="text-sm font-semibold">Testers dropped out. Your 14-day clock resets.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-card p-6 shadow-[0_30px_60px_-30px_rgba(10,132,255,0.45)] sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="mono-label text-[11px] text-primary">With Test4Test</span>
              <span className="font-mono text-sm tabular-nums text-ink-2">Day {rightDay}/14</span>
            </div>
            <p className="mt-2 text-2xl font-bold">Committed, verified testers</p>
            <div className="mt-6 grid grid-cols-10 gap-2">
              {Array.from({ length: TESTERS }, (_, i) => (
                <Tester key={`${i}-${rightDay}`} i={i} gone={false} checked={!graduated && rightDay > 0} />
              ))}
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="mono-label text-[10px] text-ink-2">Still testing</p>
                <p className="text-4xl font-bold tabular-nums text-success">
                  20<span className="text-lg text-ink-3">/{TESTERS}</span>
                </p>
              </div>
              <StreakBar done={rightDay} pulseCurrent={!graduated} className="w-1/2 [&>span]:h-3" />
            </div>
            <AnimatePresence>
              {graduated && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-success px-4 py-3 text-white shadow-lg"
                >
                  <ShieldCheck className="size-5" />
                  <span className="text-sm font-semibold">14 days complete. Ready to apply for production.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
