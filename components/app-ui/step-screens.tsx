"use client";

// Animated sequences for the "How it works" scenes, built from real app screens.
import { Activity, Check, Image as ImageIcon, MessageSquare, Pencil, PowerOff, Star } from "lucide-react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { GOOGLE_GROUP_EMAIL } from "@/lib/content";
import { CapacityCard, Card, KeyMetricCard, ProofScreenshot, RequirementsCard, SectionTitle } from "./cards";
import { AppIcon, Avatar, MOCK_APPS, NavHeader, TESTER_NAMES } from "./chrome";
import { TodayScreen, VerifyScreen } from "./screens";

/** Advances through phases at the given timestamps (ms after mount). */
function usePhase(marks: number[]) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ids = marks.map((t, i) => setTimeout(() => setPhase(i + 1), t));
    return () => ids.forEach(clearTimeout);
    // marks are static per screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return phase;
}

/** Types `text` one character at a time once `start` is true. */
function useTyped(text: string, start: boolean, speed = 45) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), speed);
    return () => clearInterval(id);
  }, [start, text.length, speed]);
  return text.slice(0, n);
}

const APP = MOCK_APPS[0];

/** Android heads-up notification sliding in over the app. */
function HeadsUp({ show, title, body, avatar }: { show: boolean; title: string; body: string; avatar?: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="absolute inset-x-[10px] top-[38px] z-40 flex items-center gap-[12px] rounded-[24px] border border-line bg-card p-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          {avatar !== undefined ? <Avatar i={avatar} size={40} /> : <AppIcon app={MOCK_APPS[1]} size={40} />}
          <div className="min-w-0 flex-1">
            <p className="text-[12px] text-ink-2">Test4Test · now</p>
            <p className="truncate text-[15px] font-bold">{title}</p>
            <p className="truncate text-[13px] text-ink-2">{body}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- 1. List your app (studio/new.tsx) ----------

function Label({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-[8px] mt-[16px] flex items-end justify-between">
      <span className="text-[11px] font-extrabold tracking-[1px] text-ink-2">{children}</span>
      {right && <span className="text-[10px] font-extrabold text-ink-2">{right}</span>}
    </div>
  );
}

function Input({ value, placeholder, tall, muted }: { value: string; placeholder: string; tall?: boolean; muted?: boolean }) {
  return (
    <div className={`rounded-[8px] border border-line bg-card p-[14px] text-[16px] ${tall ? "h-[100px]" : ""} ${muted ? "opacity-70" : ""}`}>
      {value ? <span>{value}</span> : <span className="text-ink-2">{placeholder}</span>}
    </div>
  );
}

const TIERS = [
  { name: "Basic", testers: 12, days: "14 DAYS", cost: "80 tokens" },
  { name: "Pro", testers: 25, days: "20 DAYS", cost: "150 tokens" },
  { name: "Pro+", testers: 50, days: "30 DAYS", cost: "300 tokens" },
];

export function ListStepScreen() {
  // icon, name, desc, url, scroll→tier, scroll→setup, check, scroll→end, press, published
  const phase = usePhase([400, 700, 1500, 2200, 2700, 3400, 4000, 4500, 5100, 5500]);
  const name = useTyped(APP.name, phase >= 2);
  const desc = useTyped(APP.blurb, phase >= 3, 30);
  const url = phase >= 4 ? "https://play.google.com/apps/testing/com.pocketbudget" : "";
  const viewport = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLDivElement>(null);
  const scroll = useAnimationControls();
  const step = phase >= 8 ? 3 : phase >= 6 ? 2 : phase >= 5 ? 1 : 0;

  useEffect(() => {
    const max = (form.current?.offsetHeight ?? 0) - (viewport.current?.offsetHeight ?? 0);
    const at = [0, 0.48, 0.74, 1][step] * Math.max(0, max);
    scroll.start({ y: -at, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } });
  }, [step, scroll]);

  return (
    <>
      <NavHeader label="Build" />
      <div ref={viewport} className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div ref={form} animate={scroll} className="px-[12px] pb-[24px]">
          <Label>APP TYPE</Label>
          <div className="mb-[24px] flex rounded-[8px] bg-card p-[4px]">
            <span className="flex-1 rounded-[6px] bg-primary py-[10px] text-center text-[14px] font-semibold text-white">14-Day Testing</span>
            <span className="flex-1 py-[10px] text-center text-[14px] font-semibold text-ink-2">Production (ASO)</span>
          </div>
          <Label>APP ICON</Label>
          <div className="mb-[8px] grid size-[100px] place-items-center overflow-hidden rounded-[12px] border border-dashed border-line bg-card">
            <AnimatePresence mode="wait">
              {phase >= 1 ? (
                <motion.span key="i" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                  <AppIcon app={APP} size={100} />
                </motion.span>
              ) : (
                <motion.span key="p" exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <ImageIcon className="size-[32px] text-ink-2" />
                  <span className="mt-[4px] text-[10px] font-semibold text-ink-2">Upload Icon</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Label right={`${name.length}/30`}>APP NAME</Label>
          <Input value={name} placeholder="MyApp" />
          <Label>ANDROID PACKAGE NAME</Label>
          <Input value={url ? "com.pocketbudget" : ""} placeholder="com.company.app (auto-filled from URL)" muted />
          <Label right={`${desc.length}/50`}>DESCRIPTION</Label>
          <Input value={desc} placeholder="What does it do?" tall />
          <Label>PLAY CONSOLE OPT-IN ANDROID URL</Label>
          <div className="truncate rounded-[8px] border border-line bg-card p-[14px] text-[16px]">
            {url ? <span>{url}</span> : <span className="text-ink-2">https://play.google.com/store/...</span>}
          </div>
          <Label>TIER &amp; DURATION</Label>
          <div className="flex gap-[8px]">
            {TIERS.map((t, i) => {
              const on = i === 0;
              return (
                <div key={t.name} className={`flex-1 rounded-[4px] border-2 p-[12px] ${on ? "border-primary bg-primary text-white" : "border-ink bg-bg"}`}>
                  <p className="mb-[4px] text-[16px] font-extrabold">{t.name}</p>
                  <p className="mb-[2px] text-[10px] font-bold">{t.testers} TESTERS</p>
                  <p className="mb-[2px] text-[10px] font-bold">{t.days}</p>
                  <p className={`mt-[8px] text-[10px] font-extrabold ${on ? "text-white" : "text-ink-2"}`}>{t.cost}</p>
                </div>
              );
            })}
          </div>
          <Label>GOOGLE PLAY CONSOLE SETUP</Label>
          <div className="mb-[24px] rounded-[12px] border border-[#FFCC00] bg-[#FFF4CE] p-[12px] dark:border-[#997A00] dark:bg-[#1F1A00]">
            <p className="mb-[12px] text-[13px] leading-[18px] text-ink-2">
              To quickly add our community of testers, paste the Google Group email below into your Play Console&apos;s email list for this track:
            </p>
            <div className="relative mb-[16px] h-[160px] overflow-hidden rounded-[8px] border border-line">
              <Image src="/tester_googlegroup.jpg" alt="" fill sizes="400px" className="object-cover" />
            </div>
            <div className="mb-[16px] rounded-[8px] bg-[#FFE58F] p-[12px] dark:bg-[#332900]">
              <span className="rn-mono text-[13.5px] font-extrabold text-black dark:text-white">{GOOGLE_GROUP_EMAIL}</span>
            </div>
            <div className="flex items-center">
              <motion.span
                animate={{ backgroundColor: phase >= 7 ? "var(--primary)" : "var(--card)", borderColor: phase >= 7 ? "var(--primary)" : "#D4AA00" }}
                className="mr-[10px] grid size-[20px] place-items-center rounded-[4px] border"
              >
                {phase >= 7 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="size-[14px] text-bg" strokeWidth={3} />
                  </motion.span>
                )}
              </motion.span>
              <span className="text-[14px] font-semibold text-black dark:text-white">I have added this email to my testers</span>
            </div>
          </div>
          <Label>GEO TARGETING</Label>
          <div className="mb-[12px] flex flex-col gap-[8px]">
            {["Global", "Specific"].map((o, i) => (
              <div key={o} className={`flex items-center rounded-[12px] border p-[12px] ${i === 0 ? "border-warning bg-warning" : "border-line bg-card"}`}>
                <span className={`mr-[12px] grid size-[20px] place-items-center rounded-full border bg-card ${i === 0 ? "border-primary" : "border-ink-2"}`}>
                  {i === 0 && <span className="size-[10px] rounded-full bg-primary" />}
                </span>
                <span className={`text-[14px] font-bold ${i === 0 ? "text-black" : ""}`}>{o}</span>
              </div>
            ))}
          </div>
          <motion.div
            animate={{ scale: phase === 9 ? 0.96 : 1, backgroundColor: phase >= 10 ? "var(--success)" : "var(--primary)" }}
            className="mt-[16px] flex items-center justify-center gap-[8px] rounded-[12px] py-[18px]"
          >
            {phase >= 10 && <Check className="size-[18px] text-white" strokeWidth={3} />}
            <span className="rn-mono text-[16px] font-extrabold text-white">{phase >= 10 ? "LISTING PUBLISHED" : "PUBLISH LISTING • 80 TOKENS"}</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

// ---------- 2. Testers lock in (catalog/[id].tsx) ----------

export function TestersStepScreen() {
  const [locked, setLocked] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLocked((n) => (n >= 20 ? n : n + 1)), 150);
    return () => clearInterval(id);
  }, []);
  const notif = Math.min(19, Math.floor(locked / 4) * 4);

  return (
    <>
      <NavHeader label="Catalog" card />
      <HeadsUp show={locked >= 3 && locked < 20} title={`${TESTER_NAMES[notif + 3]} joined your test 🎉`} body={`${APP.name} · ${locked}/25 testers locked`} avatar={notif + 3} />
      <div className="relative min-h-0 flex-1 overflow-hidden p-[12px]">
        <Card>
          <div className="mb-[12px] flex items-start">
            <span className="mr-[16px] grid size-[72px] place-items-center rounded-[12px] bg-bg">
              <AppIcon app={APP} size={64} />
            </span>
            <div className="flex-1">
              <p className="text-[22px] font-extrabold leading-tight">{APP.name}</p>
              <p className="mb-[8px] text-[14px] text-ink-2">by You</p>
              <span className="rounded-[4px] bg-warning/10 px-[6px] py-[2px] text-[9px] font-extrabold text-warning">🔥 PROMOTED</span>
            </div>
          </div>
          <div className="mb-[12px] h-px bg-line" />
          <p className="text-[16px] leading-[24px]">{APP.blurb}</p>
        </Card>
        <SectionTitle className="!mb-[8px] mt-[16px]">CAPACITY</SectionTitle>
        <CapacityCard locked={locked} total={25} />
        <SectionTitle className="!mb-[8px] mt-[16px]">REQUIREMENTS</SectionTitle>
        <RequirementsCard />
        <SectionTitle className="!mb-[8px] mt-[16px]">TESTERS ({locked})</SectionTitle>
        <Card className="flex flex-wrap gap-[6px]">
          <AnimatePresence>
            {Array.from({ length: locked }, (_, i) => (
              <motion.span key={i} initial={{ scale: 0, y: 8 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                <Avatar i={i} size={32} />
              </motion.span>
            ))}
          </AnimatePresence>
        </Card>
      </div>
      <div className="shrink-0 border-t border-line bg-card px-[16px] pb-[24px] pt-[12px]">
        <div className="flex items-center justify-between rounded-[12px] bg-line px-[20px] py-[18px]">
          <span className="text-[16px] font-extrabold text-ink-2">Your App</span>
          <span className="text-[14px] font-bold text-ink-2">Cannot test your own app</span>
        </div>
      </div>
    </>
  );
}

// ---------- 3. Daily verified proof (Today → Verify) ----------

export function ProofStepScreen() {
  // launch, timer done, screenshot, uploading, waiting, → verify, press, approved
  const phase = usePhase([500, 1700, 2100, 2700, 3300, 4400, 5200, 5500]);
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    if (phase !== 1) return;
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 5)), 100);
    return () => clearInterval(id);
  }, [phase]);
  const proof = phase >= 5 ? "waiting" : phase >= 4 ? "uploading" : phase >= 2 ? "unlocked" : phase >= 1 ? "launching" : "ready";
  const onVerify = phase >= 6;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <AnimatePresence mode="popLayout" initial={false}>
        {!onVerify ? (
          <motion.div key="today" exit={{ x: -80, opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col">
            <TodayScreen day={9} proof={proof} timer={timer} />
          </motion.div>
        ) : (
          <motion.div key="verify" initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col">
            <VerifyScreen approve={phase >= 8 ? "approved" : phase >= 7 ? "pressed" : "idle"} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase >= 3 && phase < 5 && (
          <motion.div
            initial={{ y: 420, rotate: 8, opacity: 0 }}
            animate={{ y: 0, rotate: -3, opacity: 1 }}
            exit={{ x: 110, y: 230, scale: 0.12, opacity: 0, transition: { duration: 0.45, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="absolute left-[100px] top-[230px] z-30 h-[300px] w-[210px] overflow-hidden rounded-[18px] border-4 border-card shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <ProofScreenshot app={MOCK_APPS[3]} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- 4. Graduate (studio/[id].tsx) ----------

const CHART = [6, 9, 12, 14, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20];

export function GraduateStepScreen() {
  const [day, setDay] = useState(6);
  useEffect(() => {
    const id = setInterval(() => setDay((d) => (d >= 14 ? d : d + 1)), 260);
    return () => clearInterval(id);
  }, []);
  const complete = day >= 14;

  return (
    <>
      <NavHeader label="Build" />
      <HeadsUp show={complete} title="Closed test complete 🎉" body={`${APP.name} kept 20 testers for 14 days`} />
      <div className="relative min-h-0 flex-1 overflow-hidden p-[12px]">
        <div className="relative mb-[24px] flex items-center rounded-[16px] border border-line bg-card p-[16px]">
          <Pencil className="absolute right-[16px] top-[16px] size-[16px] text-ink-2" />
          <span className="mr-[16px] overflow-hidden rounded-[13px] border border-line">
            <AppIcon app={APP} size={64} />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-[6px]">
              <span className="mb-[2px] text-[20px] font-bold">{APP.name}</span>
              <span className="rounded-[4px] bg-soft-blue px-[6px] py-[2px] text-[9px] font-extrabold text-primary">LIVE</span>
            </div>
            <p className="mb-[6px] text-[13px] text-ink-2">Pro tier · 25 testers · Day {day} of 14</p>
            <div className="flex items-center">
              <Star className="size-[14px] fill-primary text-primary" />
              <span className="ml-[4px] text-[13px] font-semibold">
                4.9 · <span className="font-normal text-ink-2">18 reviews</span>
              </span>
            </div>
          </div>
        </div>
        <p className="mb-[12px] text-[12px] font-extrabold tracking-[1px] text-ink-2">KEY METRICS</p>
        <div className="mb-[24px] flex flex-wrap gap-[12px]">
          <KeyMetricCard kind="locked" value={20} total={25} sub="80% capacity" />
          <KeyMetricCard kind="active" value={CHART[day - 1]} sub="sessions verified" />
          <KeyMetricCard kind="churn" value="0%" sub="0 drop-offs" />
          <KeyMetricCard kind="rating" value="4.9" sub="18 reviews" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {complete ? (
            <motion.div
              key="convert"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: [0.96, 1.03, 1] }}
              className="mb-[24px] flex items-center justify-center gap-[8px] rounded-[12px] border-2 border-success bg-success py-[14px]"
            >
              <Star className="size-[18px] fill-white text-white" />
              <span className="text-[14px] font-extrabold text-white">CONVERT TO PRODUCTION</span>
            </motion.div>
          ) : (
            <motion.div key="toggles" exit={{ opacity: 0, y: -8 }} className="mb-[24px] flex gap-[12px]">
              <span className="flex flex-1 items-center justify-center gap-[8px] rounded-[12px] border-2 border-danger bg-[#FFEBEE] py-[14px] dark:bg-[#3C1818]">
                <PowerOff className="size-[18px] text-danger" />
                <span className="text-[14px] font-extrabold text-danger">DELIST APP</span>
              </span>
              <span className="flex flex-1 items-center justify-center gap-[8px] rounded-[12px] border-2 border-warning bg-warning py-[14px]">
                <Activity className="size-[18px] text-white" />
                <span className="text-[14px] font-extrabold text-white">BOOST LISTING</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mb-[12px] flex items-center justify-between">
          <span className="text-[12px] font-extrabold tracking-[1px] text-ink-2">DAILY METRICS</span>
          <span className="flex items-center text-[10px] font-semibold text-ink-2">
            <span className="mr-[4px] size-[8px] rounded-full bg-primary" />
            Installed
            <span className="ml-[8px] mr-[4px] size-[8px] rounded-full bg-success" />
            Checked In
          </span>
        </div>
        <div className="flex h-[180px] items-end gap-[6px] rounded-[16px] border border-line bg-card p-[16px]">
          {CHART.map((v, i) => (
            <div key={i} className="flex h-full flex-1 items-end gap-[2px]">
              {[20, v].map((h, j) => (
                <span key={j} className="relative h-full flex-1 overflow-hidden rounded-[4px] bg-bg">
                  <motion.span
                    className={`absolute inset-x-0 bottom-0 rounded-[4px] ${j ? "bg-success" : "bg-primary"}`}
                    initial={{ height: 0 }}
                    animate={{ height: i < day ? `${(h / 25) * 100}%` : 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 border-t border-line bg-bg px-[16px] pb-[20px] pt-[16px]">
        <div className="flex items-center justify-center gap-[10px] rounded-[16px] bg-primary py-[16px]">
          <MessageSquare className="size-[22px] text-white" />
          <span className="text-[18px] font-bold text-white">View Tester Reviews (18)</span>
        </div>
      </div>
    </>
  );
}
