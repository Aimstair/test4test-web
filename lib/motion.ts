import type { Transition, Variants } from "motion/react";

export const spring: Transition = { type: "spring", stiffness: 260, damping: 26 };
export const softSpring: Transition = { type: "spring", stiffness: 120, damping: 20 };
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring },
};
