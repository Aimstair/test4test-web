"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { GraduateStepScreen, ListStepScreen, ProofStepScreen, TestersStepScreen } from "@/components/app-ui/step-screens";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ease } from "@/lib/motion";

const STEPS = [
  {
    title: "List your app",
    body: "Paste your app name, pick a tier and region, and add one Google Group email to Play Console. Publish with tokens you've earned.",
    Screen: ListStepScreen,
  },
  {
    title: "Testers lock in",
    body: "Your listing goes live in the Catalog. Developers from around the world claim a slot and commit to a 14-day contract.",
    Screen: TestersStepScreen,
  },
  {
    title: "Daily verified proof",
    body: "Every day before the UTC reset, testers open your app and upload a screenshot. The photo date is checked automatically, and missed days cost Karma.",
    Screen: ProofStepScreen,
  },
  {
    title: "Graduate to production",
    body: "Fourteen verified days later, your closed test is complete and you can apply for production with confidence.",
    Screen: GraduateStepScreen,
  },
];

function StepProgress({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const n = STEPS.length;
  const scaleY = useTransform(progress, [index / n, (index + 1) / n], [0, 1]);
  return (
    <span className="absolute left-[19px] top-12 bottom-0 w-[2px] overflow-hidden rounded bg-line">
      <motion.span style={{ scaleY }} className="block h-full w-full origin-top bg-primary" />
    </span>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length))));
  });
  const { Screen } = STEPS[step];

  return (
    <section id="how" ref={ref} className="relative" style={{ height: `${STEPS.length * 90 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-5 lg:grid-cols-2 lg:gap-16">
          {/* steps */}
          <div className="flex flex-col pt-16 lg:pt-0">
            <span className="mono-label self-start rounded-full border border-line bg-card px-3 py-1.5 text-[11px] text-primary">
              [ How it works ]
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              From listing to launch in <span className="text-primary">four steps.</span>
            </h2>

            {/* desktop list */}
            <ol className="mt-10 hidden flex-col lg:flex">
              {STEPS.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
                    {i < STEPS.length - 1 && <StepProgress progress={scrollYProgress} index={i} />}
                    <motion.span
                      animate={{
                        backgroundColor: i <= step ? "var(--primary)" : "var(--card)",
                        color: i <= step ? "#fff" : "var(--text-2)",
                        scale: on ? 1.1 : 1,
                      }}
                      className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line font-mono text-sm font-bold"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                    <div className="pt-1.5">
                      <motion.p animate={{ opacity: on ? 1 : 0.45 }} className="text-xl font-bold">
                        {s.title}
                      </motion.p>
                      <motion.div
                        initial={false}
                        animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-md pt-2 text-ink-2">{s.body}</p>
                      </motion.div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* mobile: active step only */}
            <div className="mt-4 min-h-[120px] lg:hidden">
              <div className="mb-3 flex gap-1.5">
                {STEPS.map((_, i) => (
                  <motion.span key={i} animate={{ width: i === step ? 28 : 8, opacity: i <= step ? 1 : 0.3 }} className="h-2 rounded-full bg-primary" />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <p className="text-lg font-bold">
                    <span className="mr-2 font-mono text-primary">{String(step + 1).padStart(2, "0")}</span>
                    {STEPS[step].title}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{STEPS[step].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* phone */}
          <div className="relative mx-auto [zoom:0.62] sm:[zoom:0.75] lg:[zoom:1]">
            <PhoneFrame label={`Test4Test app: ${STEPS[step].title}`}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -60, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0 flex flex-col"
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
