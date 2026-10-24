"use client";

import { CalendarCheck, CalendarX, Coins, Lock, MessageSquare, RotateCcw, Rocket, TestTube2, UserPlus } from "lucide-react";
import { KarmaIcon, Reward, TokenIcon } from "@/components/ui/Reward";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { PlayBadge } from "@/components/ui/PlayBadge";
import { AnimatedNumber, SectionHeader } from "@/components/ui/primitives";
import { ECONOMY } from "@/lib/content";

let coinSeq = 0;
type Coin = { id: number; x: number; y: number; dx: number; dy: number };

const RULES: { icon: typeof Coins; color: string; label: string; value: string | number; kind: "token" | "karma"; suffix?: string }[] = [
  { icon: TestTube2, color: "text-ink-2", label: "Test an app", value: `+${ECONOMY.tokensPerTest}`, kind: "token" },
  { icon: MessageSquare, color: "text-ink-2", label: "Post a review", value: "+5", kind: "token" },
  { icon: UserPlus, color: "text-ink-2", label: "Invite a friend", value: `+${ECONOMY.referralBonus}`, kind: "token", suffix: "each" },
  { icon: CalendarCheck, color: "text-success", label: "Approved daily check-in", value: `+${ECONOMY.karmaPerCheckIn}`, kind: "karma" },
  { icon: CalendarX, color: "text-danger", label: "Missed day", value: ECONOMY.karmaPerMiss, kind: "karma" },
];

function ActionButton({
  children,
  onClick,
  className = "",
  btnRef,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  btnRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function Economy() {
  const goal = ECONOMY.basicListingCost;
  const [tokens, setTokens] = useState(0);
  const [karma, setKarma] = useState(0);
  const [coins, setCoins] = useState<Coin[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const testBtn = useRef<HTMLButtonElement>(null);
  const inviteBtn = useRef<HTMLButtonElement>(null);
  const karmaCtl = useAnimationControls();
  const tokenCtl = useAnimationControls();
  const unlocked = tokens >= goal;

  const fly = (from: HTMLElement | null, amount: number) => {
    const box = boxRef.current?.getBoundingClientRect();
    const f = from?.getBoundingClientRect();
    const t = counterRef.current?.getBoundingClientRect();
    if (box && f && t) {
      const sx = f.left + f.width / 2 - box.left;
      const sy = f.top + f.height / 2 - box.top;
      const ex = t.left + 24 - box.left;
      const ey = t.top + t.height / 2 - box.top;
      const n = Math.min(8, Math.max(4, Math.round(amount / 8)));
      const batch = Array.from({ length: n }, () => ({
        id: ++coinSeq,
        x: sx + (Math.random() - 0.5) * 40,
        y: sy + (Math.random() - 0.5) * 16,
        dx: ex - sx,
        dy: ey - sy,
      }));
      setCoins((c) => [...c, ...batch]);
    }
    setTimeout(() => {
      setTokens((v) => v + amount);
      tokenCtl.start({ scale: [1, 1.15, 1], transition: { duration: 0.35 } });
    }, 550);
  };

  const changeKarma = (d: number) => {
    setKarma((k) => k + d);
    karmaCtl.start(
      d > 0
        ? { scale: [1, 1.2, 1], transition: { duration: 0.35 } }
        : { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } },
    );
  };

  return (
    <section id="earn" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            center={false}
            label="Tokens & Karma"
            title={
              <>
                You don&apos;t need to pay to publish. <span className="text-primary">Earn your way there.</span>
              </>
            }
            sub={<>Tokens <TokenIcon className="size-5 align-[-3px]" /> are the currency that keeps the community fair. Karma <KarmaIcon className="size-5 align-[-3px]" /> is your reputation. Try it for yourself.</>}
          />
          <ul className="mt-8 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
            {RULES.map((r, i) => (
              <motion.li
                key={r.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <span className="flex items-center gap-3 text-ink-2">
                  <r.icon className={`size-4 ${r.color}`} /> {r.label}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-sm font-semibold">
                  <Reward value={r.value} kind={r.kind} iconClassName="size-4" />
                  {r.suffix && <span className="text-ink-2">{r.suffix}</span>}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* simulator */}
        <motion.div
          ref={boxRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] border border-line bg-card p-5 shadow-[0_40px_80px_-40px_rgba(10,40,90,0.35)] sm:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="mono-label text-[11px] text-ink-2">Try it · Token simulator</span>
            <button
              onClick={() => {
                setTokens(0);
                setKarma(0);
              }}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-ink-2 hover:bg-tag"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <motion.div ref={counterRef} animate={tokenCtl} className="rounded-3xl bg-tag p-4 sm:p-5">
              <TokenIcon className="size-7" />
              <AnimatedNumber value={tokens} className="mt-1 block text-4xl font-bold sm:text-5xl" />
            </motion.div>
            <motion.div animate={karmaCtl} className="rounded-3xl bg-tag p-4 sm:p-5">
              <KarmaIcon className="size-7" />
              <AnimatedNumber value={karma} className={`mt-1 block text-4xl font-bold sm:text-5xl ${karma < 0 ? "text-danger" : ""}`} />
            </motion.div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <ActionButton btnRef={testBtn} onClick={() => fly(testBtn.current, ECONOMY.tokensPerTest)} className="col-span-2 bg-cta text-base text-white sm:col-span-1">
              <TestTube2 className="size-4" /> Test an app <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">+{ECONOMY.tokensPerTest}</span>
            </ActionButton>
            <ActionButton btnRef={inviteBtn} onClick={() => fly(inviteBtn.current, ECONOMY.referralBonus)} className="col-span-2 bg-primary text-white sm:col-span-1">
              <UserPlus className="size-4" /> Invite a friend <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">+{ECONOMY.referralBonus}</span>
            </ActionButton>
            <ActionButton onClick={() => changeKarma(ECONOMY.karmaPerCheckIn)} className="border border-line bg-card">
              <CalendarCheck className="size-4 text-success" /> Check in <Reward value="+1" kind="karma" className="text-xs text-ink-2" />
            </ActionButton>
            <ActionButton onClick={() => changeKarma(ECONOMY.karmaPerMiss)} className="border border-line bg-card">
              <CalendarX className="size-4 text-danger" /> Miss a day <Reward value={ECONOMY.karmaPerMiss} kind="karma" className="text-xs text-ink-2" />
            </ActionButton>
          </div>

          {/* goal */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-line">
            <div className="flex items-center justify-between px-5 pt-4 text-sm">
              <span className="font-semibold">Publish a Basic listing</span>
              <Reward value={`${Math.min(tokens, goal)}/${goal}`} kind="token" className="font-mono text-ink-2" iconClassName="size-4" />
            </div>
            <div className="mx-5 mt-3 h-2.5 overflow-hidden rounded-full bg-tag">
              <motion.div
                className="h-full rounded-full bg-token"
                animate={{ width: `${Math.min(100, (tokens / goal) * 100)}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
              />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {unlocked ? (
                <motion.div
                  key="u"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex flex-col items-start gap-4 bg-success/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-3">
                    <motion.span
                      initial={{ rotate: -45, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      className="grid size-10 place-items-center rounded-full bg-success text-white"
                    >
                      <Rocket className="size-5" />
                    </motion.span>
                    <span>
                      <span className="block font-bold">Unlocked! List your app for free.</span>
                      <span className="text-sm text-ink-2">That&apos;s how it works in the real app too.</span>
                    </span>
                  </span>
                  <PlayBadge placement="simulator" />
                </motion.div>
              ) : (
                <motion.p key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 px-5 py-4 text-sm text-ink-2">
                  <Lock className="size-4" /> Earn <Reward value={goal - tokens} kind="token" className="font-semibold text-ink" /> more to publish your app.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* flying coins */}
          <AnimatePresence>
            {coins.map((c, i) => (
              <motion.span
                key={c.id}
                className="pointer-events-none absolute z-30 grid size-6 place-items-center rounded-full bg-token text-[11px] font-black text-white shadow-md"
                style={{ left: c.x - 12, top: c.y - 12 }}
                initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
                animate={{
                  x: [0, c.dx * 0.4 + (i % 2 ? 30 : -30), c.dx],
                  y: [0, c.dy * 0.5 - 60, c.dy],
                  scale: [0.4, 1.1, 0.6],
                  opacity: [0, 1, 0.9],
                }}
                transition={{ duration: 0.6, delay: (i % 8) * 0.03, ease: "easeIn" }}
                onAnimationComplete={() => setCoins((all) => all.filter((x) => x.id !== c.id))}
              >
                <Coins className="size-3.5" strokeWidth={2.5} />
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
