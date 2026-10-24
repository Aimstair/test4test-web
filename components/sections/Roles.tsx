"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { StudioScreen, TodayScreen } from "@/components/app-ui/screens";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { PlayBadge } from "@/components/ui/PlayBadge";
import { SectionHeader } from "@/components/ui/primitives";
import { IconText } from "@/components/ui/Reward";
import { ease } from "@/lib/motion";

const ROLES = {
  dev: {
    tab: "🚀 I need testers",
    title: "Ship your app without chasing people.",
    points: [
      "List in minutes and fill your slots fast",
      "Watch locked, active-today and churn in Developer Studio",
      "Approve or flag every daily proof in the Verify queue",
      "Boost a listing to pin it at the top of the Catalog 🔥",
    ],
  },
  tester: {
    tab: "🧪 I want to test apps",
    title: "Discover new apps and get rewarded daily.",
    points: [
      "Pick apps from the Catalog and claim a 14-day slot",
      "Launch, use it for a minute, and snap your daily proof",
      "Earn +20 :token: per app and +1 :karma: per approved day",
      "Climb the :karma: ranking and earn +5 :token: per review",
    ],
  },
} as const;
type Role = keyof typeof ROLES;

export function Roles() {
  const [role, setRole] = useState<Role>("dev");
  const r = ROLES[role];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader
          label="One app, two sides"
          title="Test to earn. Earn to launch."
          sub="Every developer on Test4Test is also a tester, which is why the community stays active and fair."
        />

        <div className="mt-10 flex justify-center">
          <div role="tablist" className="relative inline-grid grid-cols-2 rounded-full border border-line bg-card p-1 shadow-sm">
            {(Object.keys(ROLES) as Role[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={role === k}
                onClick={() => setRole(k)}
                className={`relative z-10 whitespace-nowrap rounded-full px-3 py-2.5 text-[13px] font-semibold transition-colors sm:px-6 sm:text-base ${
                  role === k ? "text-white" : "text-ink-2 hover:text-ink"
                }`}
              >
                {role === k && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_8px_20px_-8px_rgba(10,132,255,0.7)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {ROLES[k].tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={role} initial="hidden" animate="show" exit="exit">
                <motion.h3
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }}
                  transition={{ duration: 0.4, ease }}
                  className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  {r.title}
                </motion.h3>
                <motion.ul
                  variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                  className="mt-8 flex flex-col gap-4"
                >
                  {r.points.map((p) => (
                    <motion.li
                      key={p}
                      variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0 } }}
                      className="flex items-start gap-3 text-lg"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span>
                        <IconText text={p} />
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10">
              <PlayBadge placement={`roles-${role}`} />
            </div>
          </div>

          <div className="order-1 mx-auto [zoom:0.8] sm:[zoom:1] lg:order-2">
            <motion.div
              key={role}
              initial={{ rotateY: role === "dev" ? -25 : 25, opacity: 0.4, scale: 0.94 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ transformPerspective: 1200 }}
            >
              <PhoneFrame label={role === "dev" ? "Test4Test Build tab showing live apps, locked testers and churn" : "Test4Test Today tab showing the UTC reset countdown and a 14-day testing contract"}>{role === "dev" ? <StudioScreen /> : <TodayScreen day={9} />}</PhoneFrame>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
