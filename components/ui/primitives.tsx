"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { ease, fadeUp, stagger } from "@/lib/motion";

export function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`mono-label text-[11px] text-ink-2 ${className}`}>{children}</span>;
}

/** Fades/slides children in when scrolled into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeader({
  label,
  title,
  sub,
  center = true,
}: {
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0.1)}
      className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start"}`}
    >
      <motion.span variants={fadeUp} className="mono-label rounded-full border border-line bg-card px-3 py-1.5 text-[11px] text-primary">
        [ {label} ]
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp} className="max-w-2xl text-pretty text-lg text-ink-2">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Spring-animated number; animates whenever `value` changes. */
export function AnimatedNumber({
  value,
  decimals = 0,
  className = "",
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 });
  const display = useTransform(spring, (v) =>
    v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
  );
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span className={`tabular-nums ${className}`}>{display}</motion.span>;
}

/** Counts from 0 up to `to` once it scrolls into view. */
export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const spring = useSpring(0, { stiffness: 50, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("en-US"));
  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, spring, to]);
  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </motion.span>
  );
}
