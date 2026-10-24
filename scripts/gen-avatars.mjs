// Generates tester avatars into public/avatars (DiceBear "notionists", CC0).
// Run once: node scripts/gen-avatars.mjs
import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import { mkdirSync, writeFileSync } from "node:fs";

const SEEDS = [
  "Maya", "Leo", "Aria", "Noah", "Zoe", "Kai", "Iris", "Omar", "Luna", "Ezra",
  "Nina", "Ravi", "Sofia", "Theo", "Hana", "Milo", "Yara", "Jonas", "Elif", "Diego",
  "Amara", "Felix", "Priya", "Sam",
];
// solid backgrounds only
const BG = ["dbeafe", "fde68a", "fecaca", "bbf7d0", "e9d5ff", "fed7aa", "cffafe", "fbcfe8"];

mkdirSync("public/avatars", { recursive: true });
SEEDS.forEach((seed, i) => {
  const svg = createAvatar(notionists, {
    seed,
    backgroundColor: [BG[i % BG.length]],
    backgroundType: ["solid"],
  }).toString();
  writeFileSync(`public/avatars/${i + 1}.svg`, svg);
});
console.log(`wrote ${SEEDS.length} avatars`);
